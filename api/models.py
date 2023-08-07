from django.db import models


class Departments(models.Model):
    DepartmentId = models.AutoField(primary_key=True)
    DepartmentName = models.CharField(max_length=500)
    class Meta:
        db_table ='departments'


    def __str__(self):
		    return self.DepartmentName

    

class Employees(models.Model):
    EmployeeId = models.AutoField(primary_key=True)
    EmployeeName = models.CharField(max_length=500)
    Department = models.ForeignKey(Departments, on_delete=models.CASCADE)
    DateOfJoining = models.DateField()

    class Meta:
        db_table ='employees'

class Student(models.Model):
    name= models.CharField(max_length=100)
    email=models.EmailField(max_length=100)

    class Meta:
        db_table ='students'