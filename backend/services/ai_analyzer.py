import google.generativeai as genai
from django.conf import settings
import json

genai.configure(api_key=settings.GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash-lite")

def ai_resume_analyzer(resume_text):

    prompt = f"""
    Analyse the following resume.

    RETURN ONLY VALID JSON IN THIS FORMAT:
    {{
       "score": number,
       "detected_skills": [],
       "missing_skills": [],
       "suggestions": []
    }}

    Resume:
    {resume_text}
    """

    print("Sending request to Gemini...")

    response = model.generate_content(prompt)

    print("Raw Gemini response:")
    print(response.text)

    result_text = response.text

    result_text = result_text.replace("```json", "").replace("```", "").strip()

    try:
        parsed = json.loads(result_text)
        print("Parsed JSON:", parsed)
        return parsed

    except Exception as e:
        print("JSON parsing failed:", e)

        return {
            "score": 0,
            "detected_skills": [],
            "missing_skills": [],
            "suggestions": ["AI response parsing failed"]
        }
    

def match_resume_to_job(resume_text, job_description):
    prompt = f"""
    Compare the following resume with the job description.

    Return Only VALID JSON in this format:

    {{
    "match_score":number,
    "matched_skills":[],
    "missing_skills":[],
    "recommendations":[]
    }}

    Resume:
    {resume_text}

    Job Description:
    {job_description}
    """

    response = model.generate_content(prompt)
    result_text = response.text
    result_text = result_text.replace("```json", "").replace("```", "").strip()

    try:
        parsed = json.loads(result_text)
        print("Parsed JSON:", parsed)
        return parsed

    except Exception as e:
        print("JSON parsing failed:", e)

        return {
            "score": 0,
            "detected_skills": [],
            "missing_skills": [],
            "suggestions": ["AI response parsing failed"]
        }
    



# def analyse_resume(text):
#     skills = ["Python", "SQL", "Django", "Docker", "Machine Learning"]

#     detected_skills= []
#     missing_skills=[]

#     for skill in skills:
#         if skill.lower() in text.lower():
#             detected_skills.append(skill)
#         else:
#             missing_skills.append(skill)

#     score = int(len(detected_skills)/len(skills)*100)

#     return {
#         "score":score,
#         "detected_skills":detected_skills,
#         "missing_skills":missing_skills
#     }


# def match_job_description(resume_text, job_description):
#     skills = ["Python", "SQL", "Django", "Docker", "Machine Learning"]

#     detected_skills= []
#     missing_skills=[]

#     for skill in skills:
#         if skill.lower() in resume_text.lower() and skill.lower() in job_description.lower():
#             detected_skills.append(skill)
#         elif skill.lower() in job_description.lower():
#             missing_skills.append(skill)

#     score = int(len(detected_skills)/len(skills)*100)

#     return {
#         "score":score,
#         "matched_skills":detected_skills,
#         "missing_skills":missing_skills
#     }