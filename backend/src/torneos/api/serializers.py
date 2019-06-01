from random import choice, shuffle

from rest_framework import serializers
from django.contrib.auth.models import User

from ..models import (
  Equipo,
  Torneo,
  Ronda,
  Partido
)

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('id', 'username')

class EquipoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Equipo
    fields = ('id','nombre','partidos_jugados', 'partidos_ganados', 'partidos_empatados', 'partidos_perdidos', 'a_favor', 'en_contra', 'diferencia','puntos')


class EquipoSimpleSerializer(serializers.ModelSerializer):
  class Meta:
    model = Equipo
    fields = ('id','nombre')


class PartidoSerializer(serializers.ModelSerializer):
  equipo_local = serializers.StringRelatedField()
  equipo_visitante = serializers.StringRelatedField()

  class Meta:
    model = Partido
    fields = ('id','equipo_local', 'equipo_visitante', 'marcador_local','marcador_visitante', 'jugado')
  
  def update(self, instance, validated_data):
    equipo_local = Equipo.objects.get(id=instance.equipo_local.id)
    equipo_visitante = Equipo.objects.get(id=instance.equipo_visitante.id)

    if (instance.jugado):
      equipo_local.a_favor -= instance.marcador_local
      equipo_local.en_contra -= instance.marcador_visitante

      equipo_visitante.a_favor -= instance.marcador_visitante
      equipo_visitante.en_contra -= instance.marcador_local

      if(instance.marcador_local==instance.marcador_visitante):
        equipo_local.partidos_empatados -= 1
        equipo_visitante.partidos_empatados -= 1
      elif(instance.marcador_local>instance.marcador_visitante):
        equipo_local.partidos_ganados -= 1
        equipo_visitante.partidos_perdidos -= 1
      else:
        equipo_local.partidos_perdidos -= 1
        equipo_visitante.partidos_ganados -= 1

    instance.marcador_local = validated_data.get('marcador_local', instance.marcador_local)
    instance.marcador_visitante = validated_data.get('marcador_visitante', instance.marcador_visitante)    
    instance.jugado=True if instance.marcador_local is not None and instance.marcador_visitante is not None else False
    
    if (instance.jugado):
      equipo_local.a_favor += instance.marcador_local
      equipo_local.en_contra += instance.marcador_visitante

      equipo_visitante.a_favor += instance.marcador_visitante
      equipo_visitante.en_contra += instance.marcador_local

      if(instance.marcador_local==instance.marcador_visitante):
        equipo_local.partidos_empatados += 1
        equipo_visitante.partidos_empatados += 1
      elif(instance.marcador_local>instance.marcador_visitante):
        equipo_local.partidos_ganados += 1
        equipo_visitante.partidos_perdidos += 1
      else:
        equipo_local.partidos_perdidos += 1
        equipo_visitante.partidos_ganados += 1
    equipo_local.save()
    equipo_visitante.save()
    instance.ronda.torneo.save()
    instance.save()
    return instance


class RondaSerializer(serializers.ModelSerializer):
  partidos = PartidoSerializer(many=True)
  
  class Meta:
    model = Ronda
    fields = ('id','n_ronda', 'partidos')
    

class RondaSimpleSerializer(serializers.ModelSerializer):
  partidos = serializers.StringRelatedField(many=True)
  
  class Meta:
    model = Ronda
    fields = ('n_ronda', 'partidos')


class TorneoSimpleSerializer(serializers.ModelSerializer):
  equipos = serializers.StringRelatedField(many=True)
  rondas = RondaSimpleSerializer(many=True)
  usuario = UserSerializer()

  class Meta:
    model = Torneo
    fields = ('__all__')


class CrearTorneoSerializer(serializers.ModelSerializer):
  equipos = EquipoSimpleSerializer(many=True)

  class Meta:
    model = Torneo
    fields = ('nombre', 'equipos', 'vuelta')

  def validate_nombre(self, value):
    torneos = self.context['request'].user.torneos.all()
    for torneo in torneos:
      if value in torneo.nombre:
        raise serializers.ValidationError('Un usuario no puede tener dos torneos con el mismo nombre.')
    return value

  def validate_equipos(self, value):
    equipos = []
    for equipo in value:
      if equipo in equipos:
        raise serializers.ValidationError('No puedes tener dos equipos con el mismo nombre')
      equipos.append(equipo)
    return value
  
  def create(self, validated_data):
    equipos_data = validated_data.pop('equipos')
    vuelta = validated_data['vuelta']
    torneo = Torneo.objects.create(**validated_data)
    for equipo_data in equipos_data:
      Equipo.objects.create(torneo=torneo, **equipo_data)
    n_rondas = len(equipos_data)-1 if len(equipos_data)%2==0 else len(equipos_data)
    n_partidos = len(equipos_data)//2
    n_ronda = 1
    equipos = list(torneo.equipos.all())
    rondas = []
    shuffle(equipos)
    while (n_ronda<=n_rondas):
      partidos_ronda = []
      n_partido=0
      while (n_partido<n_partidos):
        if n_ronda % 2 == 1:
          equipo_local=equipos[n_partido]
          equipo_visitante=equipos[-(n_partido+1)]
        else:
          equipo_local=equipos[-(n_partido+1)]
          equipo_visitante=equipos[n_partido]
        partido=(equipo_local, equipo_visitante)
        partidos_ronda.append(partido)
        n_partido +=1
      shuffle(partidos_ronda)
      rondas.append(partidos_ronda)
      if n_rondas == len(equipos_data):
        equipos_siguiente_ronda = [(equipos[-1])]
        equipos_siguiente_ronda.extend(equipos[0:-1])
      else:
        equipos_siguiente_ronda = [equipos[0]]
        equipos_siguiente_ronda.append(equipos[-1])
        equipos_siguiente_ronda.extend(equipos[1:-1])
      equipos= equipos_siguiente_ronda.copy()
      n_ronda += 1
    shuffle(rondas)
    for indice, ronda in enumerate(rondas, start=1):
      ronda_creada = Ronda.objects.create(n_ronda=indice, torneo=torneo)
      for partido in ronda:
        Partido.objects.create(ronda=ronda_creada, equipo_local=partido[0], equipo_visitante=partido[1])
    if vuelta != 'N':
      if vuelta == 'A':
        shuffle(rondas)
      for indice, ronda in enumerate(rondas, start=(len(rondas)+1)):
        ronda_creada = Ronda.objects.create(n_ronda=indice, torneo=torneo)
        for partido in ronda:
          Partido.objects.create(ronda=ronda_creada, equipo_local=partido[1], equipo_visitante=partido[0])
    return torneo

class ClasificacionSerializer(serializers.ModelSerializer):
  equipos = EquipoSerializer(many=True)

  class Meta:
    model = Torneo
    fields = ('nombre', 'equipos')

class EnfrentamientosSerializer(serializers.ModelSerializer):
  rondas = RondaSerializer(many=True)

  class Meta:
    model = Torneo
    fields = ('nombre', 'rondas', 'usuario')