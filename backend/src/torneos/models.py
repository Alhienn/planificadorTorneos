from django.db import models
from django.core.validators import MinValueValidator
from django.contrib.auth.models import User


class Equipo(models.Model):
  nombre = models.CharField(max_length=50)
  torneo = models.ForeignKey('Torneo', related_name='equipos', on_delete=models.CASCADE)
  partidos_jugados = models.PositiveIntegerField(default=0)
  partidos_ganados = models.PositiveIntegerField(default=0)
  partidos_perdidos = models.PositiveIntegerField(default=0)
  partidos_empatados = models.PositiveIntegerField(default=0)
  a_favor = models.PositiveIntegerField(default=0)
  en_contra = models.PositiveIntegerField(default=0)
  diferencia = models.IntegerField(default=0)
  puntos = models.PositiveIntegerField(default=0)

  class Meta:
    ordering = ['-puntos', '-diferencia', '-a_favor','nombre']
    constraints = [
      models.UniqueConstraint(fields=['nombre', 'torneo'], name='unique_nombre_equipo')
    ]

  def __str__(self):
    return self.nombre

  def save(self, *args, **kwargs):
    self.partidos_jugados = self.partidos_ganados + self.partidos_empatados + self.partidos_perdidos
    self.puntos= self.partidos_ganados * 3 + self.partidos_empatados
    self.diferencia = self.a_favor - self.en_contra
    super(Equipo, self).save(*args, **kwargs) 


class Torneo(models.Model):
  VUELTA = (
    ('N', 'No'),
    ('S', 'Simetrica'),
    ('A', 'Asimetrica'),
  )
  
  nombre = models.CharField(max_length=50)
  vuelta = models.CharField(max_length=1, choices=VUELTA)
  usuario = models.ForeignKey(
    User,
    related_name="torneos",
    on_delete=models.CASCADE,
    blank=True, null=True
  )
  creado = models.DateTimeField(auto_now_add=True)
  actualizado = models.DateTimeField(auto_now=True)

  class Meta:
    constraints = [
      models.UniqueConstraint(fields=['nombre', 'usuario'], name='unique_nombre_torneo')
    ]

  def __str__(self):
    return self.nombre


class Ronda(models.Model):
  n_ronda = models.IntegerField(
    validators=[
      MinValueValidator(1)
    ]
  )
  torneo = models.ForeignKey('Torneo', related_name='rondas', on_delete=models.CASCADE)

  def __str__(self):
    return "Ronda: %i" % (self.n_ronda)


class Partido(models.Model):
  equipo_local = models.ForeignKey(
    'Equipo',
    on_delete=models.CASCADE,
    related_name="partido_local"
  )
  equipo_visitante = models.ForeignKey(
    'Equipo',
    on_delete=models.CASCADE,
    related_name="partido_visitante"
  )
  marcador_local =  models.PositiveIntegerField(blank=True, null=True)
  marcador_visitante =  models.PositiveIntegerField(blank=True, null=True)
  jugado = models.BooleanField(default=False)
  ronda =  models.ForeignKey('Ronda', related_name='partidos', on_delete=models.CASCADE)

  def __str__(self):
    return "%s vs %s" % (self.equipo_local, self.equipo_visitante)