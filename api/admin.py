from django.contrib import admin
from .models import Student,Employees,Departments

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
  list_display = ['id', 'name', 'email']

@admin.register(Employees)
class StudentAdmin(admin.ModelAdmin):
  list_display = ["EmployeeId","EmployeeName","Department","DateOfJoining"]

@admin.register(Departments)
class StudentAdmin(admin.ModelAdmin):
  list_display = ["DepartmentId","DepartmentName"]