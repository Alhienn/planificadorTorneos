from rest_framework import generics, permissions, filters
from rest_framework.response import Response

from ..models import Torneo, Ronda, Equipo, Partido
from .serializers import CrearTorneoSerializer, TorneoSimpleSerializer, EnfrentamientosSerializer, ClasificacionSerializer, PartidoSerializer

class CreateTorneoView(generics.GenericAPIView):
  permission_classes = [
    permissions.IsAuthenticatedOrReadOnly
  ]

  serializer_class = CrearTorneoSerializer

  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    torneo = serializer.save(usuario=self.request.user)
    return Response(
      TorneoSimpleSerializer(torneo, context=self.get_serializer_context()).data
    )


class EnfrentamientosView(generics.RetrieveAPIView):
  serializer_class = EnfrentamientosSerializer
  queryset = Torneo.objects.all()


class ClasificacionTorneoView(generics.RetrieveAPIView):
  serializer_class = ClasificacionSerializer 
  queryset = Torneo.objects.all()


class ListaTorneosView(generics.ListAPIView):
  serializer_class = TorneoSimpleSerializer

  def get_queryset(self):
    return self.request.user.torneos.all()

class BuscarTorneosView(generics.ListAPIView):
  serializer_class = TorneoSimpleSerializer
  queryset = Torneo.objects.all()
  filter_backends = (filters.SearchFilter,)
  search_fields = ('nombre', 'usuario__username')

class UpdatePartido(generics.UpdateAPIView):
  permission_classes = [
    permissions.IsAuthenticatedOrReadOnly
  ]
  serializer_class = PartidoSerializer
  queryset = Partido.objects.all()