import google.generativeai as genai
import os
from dotenv import load_dotenv
load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))


def build_gemini_prompt(risk,answers):
    print("📥 Answers payload:", answers)
    print("📥 Answers type:", type(answers))

    questions = [
      "Do you have a family history of diabetes?",
  "Do you often feel excessive thirst?",
  "Do you urinate frequently?",
  "Have you experienced sudden weight loss recently?",
  "Do you feel tired or fatigued frequently?",
  "Do you have blurred vision occasionally?",
  "Are you physically active for at least 30 minutes daily?",
  "Do you have high blood pressure?",
  "Do you have trouble healing wounds or cuts?",
  "Is your BMI greater than 25?"
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
