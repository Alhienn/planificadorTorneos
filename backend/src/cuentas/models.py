from django.db import models
from django.core.validators import MinValueValidator

class Equipo(models.Model):
  nombre = models.CharField(max_length=50)

class Torneo(models.Model):
  nombre = models.CharField(max_length=50)
  n_fases = models.IntegerField(
    validators=[
      MinValueValidator(1)
    ]
  )