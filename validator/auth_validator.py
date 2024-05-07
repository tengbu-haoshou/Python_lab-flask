#
# Lab Flask
#
# Date    : 2024-04-30
# Auther  : Hirotoshi FUJIBE
# History :
#

import re

from flask_wtf import FlaskForm
from wtforms import StringField, ValidationError


#
class Form(FlaskForm):

    user_name = StringField('')
    password = StringField('')

    def validate_user_name(self, user_name) -> None:  # noqa
        if user_name.data == '':
            raise ValidationError('User ID or Password is not correct.')
        if len(user_name.data) > 32:
            raise ValidationError('User ID or Password is not correct.')
        if re.fullmatch("[a-zA-Z0-9_-]*", user_name.data) is None:
            raise ValidationError('User ID or Password is not correct.')
        return

    # Password verification is implemented in auth_action.py
    def validate_password(self, password) -> None:  # noqa
        if password.data == '':
            raise ValidationError('User ID or Password is not correct.')
        return
