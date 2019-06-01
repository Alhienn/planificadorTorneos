from django.urls import path, include

from .views import CreateTorneoView, EnfrentamientosView, ClasificacionTorneoView, ListaTorneosView, BuscarTorneosView, UpdatePartido

urlpatterns = [
  path('crearTorneo',CreateTorneoView.as_view()),
  path('torneo/<pk>/enfrentamientos', EnfrentamientosView.as_view()),
  path('torneo/<pk>/clasificacion', ClasificacionTorneoView.as_view()),
  path('torneos/usuario', ListaTorneosView.as_view()),
  path('torneos',BuscarTorneosView.as_view()),
  path('partido/<pk>', UpdatePartido.as_view()),
]