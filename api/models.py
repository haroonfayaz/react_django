from django.db import models

class Student(models.Model):
    name= models.CharField(max_length=100)
    email=models.EmailField(max_length=100)

    class Meta:
        db_table ='students'