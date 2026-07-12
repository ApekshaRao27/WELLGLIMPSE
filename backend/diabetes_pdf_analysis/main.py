from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import traceback
from test_script import evaluate_risk  # Your risk evaluation logic
from ai_suggester import get_gemini_suggestions  # Gemini suggestions
from test_script import analyze_report  # Your OCR + analysis logic
import firebase_admin;
from firebase_admin import credentials,initialize_app
from firebase_admin import auth as auth
import jwt
from jwt.exceptions import InvalidSignatureError, ExpiredSignatureError, DecodeError
from functools import wraps
import json

from dotenv import load_dotenv
load_dotenv()

# 🔐 Load Firebase credentials from Render environment variable
firebase_json = os.environ.get("FIREBASE_KEY_JSON")

if firebase_json:
    cred_dict = json.loads(firebase_json)
    cred = credentials.Certificate(cred_dict)
else:
    cred = credentials.Certificate("../config/firebase_admin_key.json")

initialize_app(cred)

app = Flask(__name__)
CORS(app) 

SECRET_KEY = os.getenv("JWT_SECRET")

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def verify_token(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        print("Incoming Auth Header:", auth_header)
        if not auth_header or "Bearer " not in auth_header:
            return jsonify({'message': 'Token is missing or malformed'}), 401
        
        token = auth_header.split("Bearer ")[1].strip()

        decoded_token = None
        print("Raw token:", repr(token))

        # Try Firebase verification first
        try:
            decoded_token = auth.verify_id_token(token)
            print("✅ Firebase token verified")
        except Exception as firebase_error:
            print("⚠️ Firebase verification failed:", firebase_error)

            # Fallback to manual JWT decode
            try:
                decoded_token = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
                print("✅ Manual JWT verified:", decoded_token)
            except (InvalidSignatureError, ExpiredSignatureError, jwt.DecodeError) as jwt_error:
                print("❌ Manual JWT verification failed:", jwt_error)
                return jsonify({'message': 'Invalid token'}), 401

        request.user = decoded_token
        return f(*args, **kwargs)

    return decorated_function

# ---------------------------- Upload Route ----------------------------
@app.route("/analyze", methods=["POST"])
@verify_token
def analyze():
    print("📥 Request received on /predict or /analyze_manual")
    
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)

    try:
        print("📄 Analyzing report at:", filepath)
        extracted_data = analyze_report(filepath)
        print("✅ Extracted data:", extracted_data)

        if extracted_data.get("status") == "no_data":
            return jsonify({
                "message": extracted_data["message"]
            })

        if "overall" in extracted_data:
            ai_advice = get_gemini_suggestions(extracted_data["results"], extracted_data["overall"])
        else:
            ai_advice = "No AI suggestions generated. Please upload a valid diabetes report."
        
        return jsonify({
            "extracted": extracted_data,
            "ai_advice": extracted_data.get("ai_suggestions", ai_advice)
        })

    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


# ------------------------ Manual Entry Route -------------------------
@app.route("/analyze_manual", methods=["POST"])
@verify_token
def analyze_manual():
    try:
        print("🔥 /analyze_manual route hit")
        data = request.get_json()
        print("✅ Manual data received:", data)

        results = {}
        missing_data = False  # Track if any field was missing or invalid

        for key, value in data.items():
            try:
                if value in [None, "", "NA", "N/A", "na", "n/a"]:
                    missing_data = True
                    continue
                results[key.upper()] = float(value)
            except ValueError:
                missing_data = True
                continue  # Skip non-numeric or invalid values

        #  Stop and return early if no valid input
        if not results:
            return jsonify({
                "status": "no_data",
                "message": "No valid data provided for analysis. Please enter at least one value."
            })

        #  Evaluate only if results are present
        overall, risk_flags = evaluate_risk(results)
        ai_suggestions = get_gemini_suggestions(results, overall).replace("*", "")

        response = {
            "extracted": {
                "results": results,
                "overall": overall,
                "risk_flags": risk_flags
            },
            "ai_advice": ai_suggestions
        }

        if missing_data:
            response["note"] = "Some values were missing, so only partial analysis was done. If a test is not available, please enter 'N/A'."

        return jsonify(response)

    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

print("✅ Registered routes:")
for rule in app.url_map.iter_rules():
    print(rule)



# ---------------------------- Main Entry -----------------------------

if __name__ == "__main__":
    print(app.url_map)
    port = int(os.environ.get("PORT", 5003))
    app.run(debug=True, host='0.0.0.0', port=port)

