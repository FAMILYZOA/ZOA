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
            raise ValueError('The Phone number must be set')
        if len(phone) != 11 :
            raise ValueError('The Phone number is 11 digits.')
        
        if not name :
            raise ValueError('The name must be set')
        if len(name) < 2 :
            raise ValueError('Please enter a name with at least 2 characters')
        if len(name) > 8 :
            raise ValueError('Please enter a name of 8 characters or less')

        if not password :
            raise ValueError('The password must be set')
        if 'birth' in extra_fields :
            if len(extra_fields['birth'])!= 8 : 
                raise ValueError('Please enter your date of birth in 8 digits')
        
        user = self.model(phone=phone, name=name,**extra_fields)
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