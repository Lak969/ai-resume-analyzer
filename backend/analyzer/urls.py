from django.urls import path
from .views import upload_resume, job_match, signup, my_resumes

from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path("upload/", upload_resume),
    path("job-match/", job_match),
    path("signup/", signup),
    path("my-resumes/", my_resumes),
    path("login/", TokenObtainPairView.as_view())
    
]