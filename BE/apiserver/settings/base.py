"""
Django settings for apiserver project.

Generated by 'django-admin startproject' using Django 3.2.16.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""

from pathlib import Path
from datetime import timedelta
import os, environ
import pymysql  
pymysql.install_as_MySQLdb()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
env = environ.Env(
    # set casting, default value
    DEBUG=(bool, False)
)
BASE_DIR = Path(__file__).resolve().parent.parent.parent
environ.Env.read_env(
    env_file=os.path.join(BASE_DIR, '.env')
)
SECRET_KEY = env('SECRET_KEY')

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
# SECURITY WARNING: don't run with debug turned on in production!

# Application definition

INSTALLED_APPS = [
    # myapp 
    'accounts',
    'families',
    'checklist',
    'scrums',
    'event',
    'audios',
    'schedule',

    # default
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    #3rd-party
    'django_extensions',
    'django_filters',
    'rest_framework',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',
    'drf_yasg',
    'corsheaders',
    'storages',
    'django_crontab',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'apiserver.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'apiserver.wsgi.application'

# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
}

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        'OPTIONS': {
            'min_length': 8,
        }
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


SWAGGER_SETTINGS = {
    'SECURITY_DEFINITIONS' :{
        'Bearer':{
            'type':'apiKey',
            'name':'Authorization',
            'in':'header'
        }
    }
}

# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'ko-kr'

TIME_ZONE = 'Asia/Seoul'

USE_I18N = True

USE_L10N = True

USE_TZ = False


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

AUTH_USER_MODEL = 'accounts.User'

SIMPLE_JWT = {
    'AUTH_HEADER_TYPES': ('Bearer','JWT',),
    'ALGORITHM': env('Algorithm'),
    'SIGNING_KEY': SECRET_KEY,
    'ROTATE_REFRESH_TOKENS': True,
    'UPDATE_LAST_LOGIN': True,
    'ACCESS_TOKEN_LIFETIME': timedelta(days=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
}

SMS_SECRET = {
    'SMSServiceId' : env('SMSServiceId'),
    'SMSAccessKey' : env('SMSAccessKey'),
    'SMSSecretKey' : env('SMSSecretKey'),
    'FromUser' : env('FromUser'),
}
AWS_ACCESS_KEY_ID = env('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = env('AWS_SECRET_ACCESS_KEY')
AWS_REGION = 'ap-northeast-2'

AWS_STORAGE_BUCKET_NAME = 'zoa-bucket' # 설정한 버킷 이름
AWS_S3_CUSTOM_DOMAIN = '%s.s3.%s.amazonaws.com' % (AWS_STORAGE_BUCKET_NAME,AWS_REGION)
AWS_S3_OBJECT_PARAMETERS = {
    'CacheControl': 'max-age=86400',
}
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'


STATIC_URL = '/assets/'
STATIC_ROOT = os.path.join(BASE_DIR,'staticfiles')
# 스태틱폴더를 따로 만들어서 앱에 종속되지 않고 접근할 수 있게한다. 
STATICFILES_DIRS = [
    BASE_DIR / "assets",
]
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


MEDIA_ROOT = os.path.join(BASE_DIR, 'path/to/store/my/files/')

CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True

CORS_ALLOW_METHODS = (
    'DELETE',
    'GET',
    'POST',
    'PUT',
    'PATCH'
)

CORS_ALLOW_HEADERS = (
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
)

CRONJOBS = [
    ('*/1 * * * *', 'families.cron.DeleteCodeObject'),
]