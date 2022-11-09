from .base import *
import os,environ

DEBUG=True

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
            'NAME': 'zoa_test',
        },
        'OPTIONS': {
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
            'charset': 'utf8mb4',
            'use_unicode': True,
        },
     } 
}
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR,'staticfiles')
# 스태틱폴더를 따로 만들어서 앱에 종속되지 않고 접근할 수 있게한다. 
STATICFILES_DIRS = [
    BASE_DIR / "static",
]