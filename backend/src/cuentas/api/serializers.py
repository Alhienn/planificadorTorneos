from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password

# User Serializer
class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('id', 'username', 'email')

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('id', 'username', 'email', 'password')
    extra_kwargs = {'password': {'write_only': True}}

  def create(self, validated_data):
    user = User.objects.create_user(validated_data['username'], validated_data['email'],validated_data['password'])
    return user

# Login Serializer
class LoginSerializer(serializers.Serializer):
  username = serializers.CharField(required=True)
  password = serializers.CharField(required=True)

  def validate(self, data):
    user = authenticate(**data)
    if user and user.is_active:
      return user
    raise serializers.ValidationError({"credentials": "Usuario o contraseña incorrectos."})

class ChangePasswordSerializer(serializers.Serializer):
  new_password = serializers.CharField(required=True)
  old_password = serializers.CharField(required=True)

  def validate_new_password(self, value):
    validate_password(value)
    if self.context['request'].user.check_password(value):
      raise serializers.ValidationError('No puede ser la contraseña anterior.')
    return value

  def validate_old_password(self, value):
    if not self.context['request'].user.check_password(value):
      raise serializers.ValidationError('Contraseña incorrecta.')
    return value
  