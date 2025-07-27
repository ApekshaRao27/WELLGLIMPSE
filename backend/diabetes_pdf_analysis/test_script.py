import fitz  # PyMuPDF
from PIL import Image, ImageEnhance, ImageFilter
import pytesseract
import io
import re
from ai_suggester import get_gemini_suggestions
import cv2
import numpy as np

# Tesseract path
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

# Field patterns
lab_fields = {
    "RANDOM BLOOD SUGAR": r"(RANDOM BLOOD SUGAR.*?)(\d+\.?\d*)\s*MG/DL",
    "CREATININE": r"(CREATININE.*?)(\d+\.?\d*)\s*MG/DL",
    "CRP": r"(CRP|REACTIVE PROTEIN|S\.C\.REACTIVE PROTIEN).*?(\d+\.?\d*)\s*MG/DL",
    "SGOT": r"(SGOT.*?)(\d+\.?\d*)",
    "HBA1C": r"(HBA1C|GLYCOSYLATED HEMOGLOBIN).*?(\d+\.?\d*)\s*%?",
    "WBC": r"(WBC.*?)(\d+[\.,]?\d*)"
}

def preprocess_image(image):
    image = image.convert("L")
    return ImageEnhance.Contrast(image).enhance(2.0)

def extract_text_from_page(page):
    raw_text = page.get_text("text")
    if raw_text.strip():
        return raw_text  # Text-based PDF
    else:
        image = Image.open(io.BytesIO(page.get_pixmap(dpi=300).tobytes("png")))
        image = preprocess_image(image)
        return pytesseract.image_to_string(image, config="--oem 3 --psm 6")

def extract_values(text):
    results = {key: None for key in lab_fields}
    lines = text.upper().split('\n')

    for key, pattern in lab_fields.items():
        for line in lines:
            if any(part in line for part in key.split()):

                    # 🚫 Skip lines with reference ranges
                if re.search(r"\bRANGE\b|\bREFERENCE\b|\bNORMAL\b\s+RANGE", line):
                  continue
                matches = re.findall(pattern, line)
                if matches:
                    try:
                        raw_val = matches[0][1].replace(",", "").replace(":", "").strip()
                        val = float(raw_val)

                        # Correction for HBA1C misreads like 79 → 7.9
                        if key == "HBA1C" and val > 15:
                            val = val / 10

                        if 0 < val < 1000:
                            results[key] = val
                            break
                    except:
                        continue
    return results

def evaluate_risk(results):
    risk_flags, risk_score = [], 0

    thresholds = {
        "RANDOM BLOOD SUGAR": [(140, "Normal"), (200, "Borderline"), (float("inf"), "High")],
        "CRP": [(3, "Normal"), (6, "Borderline"), (float("inf"), "High")],
        "CREATININE": [(1.3, "Normal"), (1.6, "Borderline"), (float("inf"), "High")],
        "SGOT": [(40, "Normal"), (55, "Borderline"), (float("inf"), "High")],
        "WBC": [(11000, "Normal"), (13000, "Borderline"), (float("inf"), "High")],
        "HBA1C": [(5.7, "Normal"), (6.5, "Borderline"), (float("inf"), "High")]
    }

    for key, levels in thresholds.items():
        val = results.get(key)
        if val is not None:
            if val < levels[0][0]:
                risk_flags.append(f"✅ {key} is {levels[0][1]}")
            elif val < levels[1][0]:
                risk_flags.append(f"⚠️ {key} is {levels[1][1]}")
                risk_score += 1
            else:
                risk_flags.append(f"❗ {key} is {levels[2][1]}")
                risk_score += 2

    # Overall risk with safe access
    rbs = results.get("RANDOM BLOOD SUGAR")
    hba1c = results.get("HBA1C")

    if (rbs is not None and rbs >= 200) or (hba1c is not None and hba1c >= 6.5):
        overall = "HIGH"
    elif risk_score <= 2:
        overall = "LOW"
    elif risk_score <= 4:
        overall = "MODERATE"
    else:
        overall = "HIGH"

    if (
        overall == "HIGH"
        and ((rbs is not None and rbs < 140) or (hba1c is not None and hba1c < 5.7))
    ):
        overall = "MODERATE"
        risk_flags.append("ℹ️ Markers are high but sugar is normal — may signal other conditions.")

    return overall, risk_flags


def analyze_report(pdf_path, debug=False):
    doc = fitz.open(pdf_path)
    full_text = ""

    for page in doc:
        page_text = extract_text_from_page(page)
        full_text += page_text + "\n"

    if debug:
        with open("ocr_debug.txt", "w", encoding="utf-8") as f:
            f.write(full_text)

    results = extract_values(full_text)

    if all(val is None for val in results.values()):
        return {
            "status": "no_data",
            "message": "No diabetes-related indicators found.",
            "results": results
        }

    overall, flags = evaluate_risk(results)
    ai_suggestions = get_gemini_suggestions(results, overall).replace("*", "")

    return {
        "status": "success",
        "results": results,
        "overall": overall,
        "risk_flags": flags,
        "ai_suggestions": ai_suggestions
    }
