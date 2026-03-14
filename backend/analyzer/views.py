from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ResumeSerializer, SignUpSerializer
from .utils import extract_text_from_pdf
from services.ai_analyzer import ai_resume_analyzer, match_resume_to_job
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from .models import Resume

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def upload_resume(request):
    file_obj = request.FILES.get("file")
    if not file_obj:
        return Response({"error": "No file uploaded"}, status=400)

    serializer = ResumeSerializer(data={"name": file_obj.name, "file": file_obj})
    if serializer.is_valid():
        resume = serializer.save(user=request.user)

        # Extract text for AI
        text = extract_text_from_pdf(resume.file.path)
        analysis = ai_resume_analyzer(text)

        return Response({
            "message": "Resume uploaded successfully",
            "score": analysis["score"],
            "detected_skills": analysis["detected_skills"],
            "missing_skills": analysis["missing_skills"],
            "suggestions": analysis["suggestions"],
        })
    return Response(serializer.errors, status=400)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def job_match(request):
    job_description = request.data.get("job_description")
    if not job_description:
        return Response({"error": "Job description required"}, status=400)

    # Fetch last uploaded resume
    resume = Resume.objects.filter(user=request.user).last()
    if not resume:
        return Response({"error": "No resume uploaded yet"}, status=400)

    resume_text = extract_text_from_pdf(resume.file.path)

    match_result = match_resume_to_job(resume_text, job_description)
    return Response(match_result)

@api_view(["POST"])
def signup(request):
    serializer = SignUpSerializer(data = request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({"message":"User Created Succesfully"})
    
    return Response(serializer.errors)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_resumes(request):
    resumes = Resume.objects.filter(user=request.user)
    serializer = ResumeSerializer(resumes, many=True)
    return Response(serializer.data)