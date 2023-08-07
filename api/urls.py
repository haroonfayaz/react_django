from django.urls import path
from .views import StudentListCreateView,StudentRetrieveUpdateDestroyView,DepartmentListCreateView,DepartmentRetrieveUpdateDestroyView,EmployeeListCreateView,EmployeeRetrieveUpdateDestroyView


urlpatterns = [
    path('students/', StudentListCreateView.as_view(), name='student-list-create'),
    path('students/<int:pk>/', StudentRetrieveUpdateDestroyView.as_view(), name='student-retrieve-update-destroy'),
    path("employee",EmployeeListCreateView.as_view(),name='employee-list'),
    path("employee/<int:pk>/",EmployeeRetrieveUpdateDestroyView.as_view(),name='employee-detail'),
    path("department",DepartmentListCreateView.as_view()),
    path("department/<int:pk>/",DepartmentRetrieveUpdateDestroyView.as_view()),

]
