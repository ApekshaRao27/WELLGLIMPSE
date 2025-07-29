import google.generativeai as genai
import os
from dotenv import load_dotenv
load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))


def build_gemini_prompt(risk,answers):
    print("📥 Answers payload:", answers)
    print("📥 Answers type:", type(answers))

    questions = [
        "Do you often feel excessive thirst?",
        "Do you experience frequent urination?",
        "Do you feel tired or fatigued regularly?",
        "Do you have blurred vision?",
        "Have you noticed sudden weight loss?",
        "Do you have slow-healing wounds?",
        "Do you experience tingling or numbness in hands/feet?",
        "Do you have increased hunger even after meals?",
        "Is there a family history of diabetes?",
        "Do you have dark patches on the neck or armpits?"
    ]

    answer_lines = "\n".join([
        f"Q{i+1}: {questions[i]} → {answers[str(i)]}" for i in range(10)

    ])

    prompt = f"""
Risk Level: {risk}  
The user answered the following 10 health-related questions:
{answer_lines}
Based on the answers above and the risk level, give 3 short and personalized health suggestions (in under 100 words) to reduce diabetes risk.
"""
    return prompt.strip()
