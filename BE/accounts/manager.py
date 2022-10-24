from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import ugettext_lazy as _


class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """
    def create_user(self, phone, password, name,**extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not phone:
            raise ValueError('The Phonenumber must be set')

        if not name :
            raise ValueError('The name must be set')

        if not password :
            raise ValueError('The password must be set')
        
        user = self.model(phone=phone, **extra_fields)
        user.set_password(password)
        user.save()
        
        return user

    def create_superuser(self, phone, password, name, **extra_fields):
        """
        Create and save a SuperUser with the given phone and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if phone is None:
            raise ValueError('Superuser must have a phone number.')
        if password is None:
            raise ValueError('Superuser must have a password.')
        if name is None :
            raise ValueError('Superuser must have a name.')

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        return self.create_user(phone, password, name, **extra_fields)