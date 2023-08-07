from django.urls import path
from api.views import StudentList


urlpatterns = [
    path("student",StudentList.as_view()),
]
