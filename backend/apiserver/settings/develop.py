import os,environ
from .base import *

DEBUG=False

ALLOWED_HOSTS = ['*']
env = environ.Env(
    # set casting, default value
    DEBUG=(bool, False)
)
# Build paths inside the project like this: BASE_DIR / 'subdir'.
# BASE_DIR = Path(__file__).resolve().parent.parent
environ.Env.read_env(
    env_file=os.path.join(BASE_DIR, '.env')
)
DATABASES = { 
	'default': { 
    	'ENGINE': 'django.db.backends.mysql', 
        'NAME': 'zoa', 
        'USER': 'root', 
        'PASSWORD': env('MYSQL_PASSWORD'), 
        'HOST': 'k7b103.p.ssafy.io', 
        'PORT': '3306', 
        'TEST': {
            'NAME': 'zoa_develop',
        },
        'OPTIONS': {
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
            'charset': 'utf8mb4',
            'use_unicode': True,
        },
     } 
}