from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS
import firebase_admin;
from firebase_admin import credentials, auth,initialize_app
import jwt
import os
from dotenv import load_dotenv
from jwt.exceptions import InvalidSignatureError, ExpiredSignatureError, DecodeError
from functools import wraps
from ai_suggestion import build_gemini_prompt
import google.generativeai as genai
import json

# 🔐 Load Firebase credentials from Render environment variable
firebase_json = os.environ.get("FIREBASE_KEY_JSON")

if firebase_json:
    cred_dict = json.loads(firebase_json)
    cred = credentials.Certificate(cred_dict)
else:
    cred = credentials.Certificate("../config/firebase_admin_key.json")

initialize_app(cred)

app = Flask(__name__)
CORS(app)  # to allow requests from React
 

load_dotenv() 
SECRET_KEY = os.getenv("JWT_SECRET")

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

# Load the trained model
model = joblib.load('diabetes_model.pkl')

@app.route('/predict', methods=['POST'])
@verify_token
def predict():
    user = getattr(request, 'user', None)
    if not user:
        return jsonify({'error': 'Unauthorized'}), 401

    try:
        print("📥 Request received on /predict")

        data = request.json.get('answers')  # list of 10 values (0/1)
        if not data or len(data) != 10:
            return jsonify({'error': 'Invalid input'}), 400

        features = np.array(data).reshape(1, -1)
        prediction = model.predict(features)[0]
        risk_score = model.predict_proba(features)[0][1]

        return jsonify({
            'predictedLabel': int(prediction),
            'riskScore': round(float(risk_score), 2)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500
#-------------------------------------------------------------------------
@app.route('/generate-suggestions', methods=['POST'])
@verify_token
def generate_suggestions():
    data = request.json
    risk = data.get('risk')
    answers = data.get('answers')  # List of 10 Yes/No strings

    if risk is None or not answers or len(answers) != 10:
        return jsonify({'error': 'Invalid input'}), 400

    prompt = build_gemini_prompt(risk, answers)
    gemini_model = genai.GenerativeModel('gemini-1.5-pro')
    response = gemini_model.generate_content(prompt)
    suggestion = response.text.strip()

    return jsonify({'suggestion': suggestion})


if __name__ == '__main__':
     port = int(os.environ.get('PORT', 5001))
     app.run(debug=True, host='0.0.0.0', port=port)
