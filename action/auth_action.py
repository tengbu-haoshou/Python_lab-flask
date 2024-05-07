#
# Lab Flask
#
# Date    : 2024-04-30
# Auther  : Hirotoshi FUJIBE
# History :
#

import binascii
from flask import jsonify
from flask_login import UserMixin
from mapper import select_mapper
from validator import auth_validator
from Crypto.Cipher import AES

# Crypto Key
CRYPTO_KEY = 'Asdf1234Asdf1234'


# Strip Padding String From ECB Decrypto String
def unpad(s):
    return s[:-ord(s[len(s) - 1:])]


# Decrypto
def decrypto(password_aes) -> str:
    password_bin = binascii.unhexlify(password_aes)
    decipher = AES.new(CRYPTO_KEY.encode('utf-8'), AES.MODE_ECB)
    dec = decipher.decrypt(password_bin)
    return unpad(dec).decode('utf-8')


#
class User(UserMixin):
    def __init__(self, in_id):
        self.id = in_id


# authorize
def auth(request, login_user) -> jsonify:

    json_data = {
        'status': '',
        'message': '',
        'list': []
    }

    form = auth_validator.Form()
    if not form.validate_on_submit():
        json_data['status'] = 'action-ng'
        json_data['message'] = 'User Name or Password is not correct.'
        return jsonify(json_data)

    user_name = request.form['user_name']
    password = request.form['password']

    try:
        sql = 'SELECT PASSWORD_AES FROM LAB_FLASK.USER_LIST WHERE USER_NAME = %s'
        result = select_mapper.select(sql, [user_name])
    except Exception:  # noqa
        json_data['status'] = 'action-ng'
        json_data['message'] = 'Unknown trouble has occurred.'
        return jsonify(json_data)

    if not len(result):
        json_data['status'] = 'action-ng'
        json_data['message'] = 'User Name or Password is not correct.'
        return jsonify(json_data)

    # Password Verification
    password_aes = result[0]['PASSWORD_AES']
    password_dec = decrypto(password_aes)
    if password != password_dec:
        json_data['status'] = 'action-ng'
        json_data['message'] = 'User Name or Password is not correct.'
        return jsonify(json_data)

    login_user(User(user_name))

    json_data['status'] = 'action-ok'
    json_data['message'] = ''
    return jsonify(json_data)
