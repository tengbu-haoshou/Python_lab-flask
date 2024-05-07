#
# Lab Flask
#
# Date    : 2024-04-30
# Auther  : Hirotoshi FUJIBE
# History :
#

from datetime import timedelta

SECRET_KEY = 'LabFlask'
WTF_CSRF_ENABLED = False
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SECURE = True
PERMANENT_SESSION_LIFETIME = timedelta(minutes=30)
