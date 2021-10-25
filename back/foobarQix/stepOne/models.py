from djongo import models
from django.utils import timezone
from django.db import models

from .managers import StepOneManager


class CustomStepOne(models.Model):
    number_step = models.IntegerField()
    string_step = models.CharField(max_length=100)
    step = models.CharField(max_length=100)

    objects = StepOneManager()

    def __str__(self):
        return self.number_step