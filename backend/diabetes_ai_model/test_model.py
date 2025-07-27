
import pandas as pd
import joblib

# Load the trained model
model = joblib.load("diabetes_model.pkl")

# Test input (10 answers from user)
test_input = pd.DataFrame([{
    "q1": 1,
    "q2": 0,
    "q3": 0,
    "q4": 0,
    "q5": 0,
    "q6": 0,
    "q7": 1,
    "q8": 1,
    "q9": 1,
    "q10": 1
}])

# Predict label (diabetes yes/no)
label_prediction = model.predict(test_input)[0]

# You can also get a confidence score (optional)
risk_score = model.predict_proba(test_input)[0][1]  # probability of having diabetes

print("Predicted Label:", label_prediction)
print("Risk Score (0–1):", round(risk_score, 2))
