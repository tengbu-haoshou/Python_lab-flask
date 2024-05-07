#
# Lab Flask
#
# Date    : 2024-04-30
# Auther  : Hirotoshi FUJIBE
# History :
#

from flask import jsonify


# un-authorize
def unauth(logout_user) -> jsonify:

    json_data = {
        'status': '',
        'message': '',
        'list': []
    }

    logout_user()

    json_data['status'] = 'action-ok'
    json_data['message'] = ''
    return jsonify(json_data)
