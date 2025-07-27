import pandas as pd
from sklearn.linear_model import LogisticRegression
import joblib

# Load dataset
df = pd.read_csv("diabetes_data.csv")

# Split inputs and output
X = df.drop(columns=["label"])  # only q1 to q10
y = df["label"]

# Train the model
model = LogisticRegression()
model.fit(X, y)



feature_names = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10']  # Replace with your actual question names if available

coefficients = model.coef_[0]  # For binary classification
feature_importance = pd.DataFrame({
    'Feature': feature_names,
    'Coefficient': coefficients
})

feature_importance['Importance'] = feature_importance['Coefficient'].abs()
feature_importance = feature_importance.sort_values(by='Importance', ascending=False)

print(feature_importance)


# Save the model
joblib.dump(model, "diabetes_model.pkl")
print("✅ Model trained and saved!")

