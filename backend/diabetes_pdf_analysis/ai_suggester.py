import google.generativeai as genai
import os
from dotenv import load_dotenv
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def get_gemini_suggestions(results, overall):
    summary_text = f"Risk Level: {overall}\n"
    for test, value in results.items():
        if value:
            summary_text += f"{test}: {value}\n"
    summary_text += "\nPlease provide personalized health and lifestyle suggestions for this patient.Keep the suggestions short, practical, and under 3 points"
    
    model = genai.GenerativeModel('gemini-1.5-pro')
    response = model.generate_content(summary_text)
    return response.text
    #return "Gemini API call disabled for now (billing paused)"