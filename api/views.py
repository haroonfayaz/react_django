from .models import Student ,Employees,Departments
from .serializers import StudentSerializer,DepartmentSerializer,EmployeeSerializer
from rest_framework.generics import ListCreateAPIView,RetrieveUpdateDestroyAPIView


class StudentListCreateView(ListCreateAPIView):
  queryset = Student.objects.all()
  serializer_class = StudentSerializer

class StudentRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    lookup_field = 'pk'

class DepartmentListCreateView(ListCreateAPIView):
    queryset =Departments.objects.all()
    serializer_class =DepartmentSerializer

class DepartmentRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
     queryset =Departments.objects.all()
     serializer_class =DepartmentSerializer
     lookup_field = 'pk'

class EmployeeListCreateView(ListCreateAPIView):
    queryset = Employees.objects.all()
    serializer_class =EmployeeSerializer

class EmployeeRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset =Employees.objects.all()
    serializer_class =EmployeeSerializer
    lookup_field = 'pk'
