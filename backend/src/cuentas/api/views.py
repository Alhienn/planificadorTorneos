from rest_framework import generics, permissions, status
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer, ChangePasswordSerializer

class RegisterView(generics.GenericAPIView):
  serializer_class = RegisterSerializer

  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    _, token = AuthToken.objects.create(user)
    return Response({
        "user": UserSerializer(user, context=self.get_serializer_context()).data,
        "token": token
    })

class LoginView(generics.GenericAPIView):
  serializer_class = LoginSerializer

  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data
    _, token = AuthToken.objects.create(user)
    return Response({
        "user": UserSerializer(user, context=self.get_serializer_context()).data,
        "token": token
    })

class UserView(generics.RetrieveAPIView):
  permission_classes = [
    permissions.IsAuthenticated,
  ]

  serializer_class = UserSerializer

  def get_object(self):
    return self.request.user

class ChangePasswordView(generics.UpdateAPIView):
  permission_classes = [
    permissions.IsAuthenticated,
  ]

  serializer_class = ChangePasswordSerializer

  def get_object(self):
    return self.request.user

  def update(self, request, *args, **kwargs):
    self.object = self.get_object()
    serializer = self.get_serializer(data=request.data)

    if serializer.is_valid():
      # Utiliza set password para encriptar la contraseña
      self.object.set_password(serializer.data.get("new_password"))
      self.object.save()
      return Response(status=status.HTTP_204_NO_CONTENT)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)