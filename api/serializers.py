from  rest_framework import serializers
from .models import Student,Employees,Departments

class StudentSerializer(serializers.ModelSerializer):
  class Meta:
    model = Student
    fields = ['id', 'name', 'email']


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Departments 
        fields=('DepartmentId','DepartmentName')

class EmployeeSerializer(serializers.ModelSerializer):
    DepartmentName = serializers.CharField(source='Department.DepartmentName', read_only=True)

    class Meta:
        model=Employees 
        fields=('EmployeeId','EmployeeName','Department','DepartmentName','DateOfJoining')
