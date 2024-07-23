#
# Lab Flask
#
# Date    : 2024-04-30
# Author  : Hirotoshi FUJIBE
# History :
#

"""

  1. On Command Prompt,

    ```bat:Command Prompt
    C:/Users/xxxx> D:
    D:/> cd /path/of/project
    D:/path/of/project> python.exe main.py
    ```

  or

    ```bat:Command Prompt
    C:/Users/xxxx> D:
    D:/> cd /path/of/project
    D:/path/of/project> waitress-serve --port=8080 main:app
    ```

  2. On Browser, access the URL 'https://localhost:8080'.

"""

import os
from flask import Flask, render_template, send_from_directory, jsonify, request, make_response
from flask_login import LoginManager, login_required, login_user, current_user, logout_user, UserMixin

from action import auth_action, unauth_action, info_action


FOLDERS = [
    {'static_folder':   './resources-react/static',
     'template_folder': './resources-react'},
    {'static_folder':   './resources-vue/assets',
     'template_folder': './resources-vue'},
]

# Please select React environment or Vue environment.
FOLDER = 0    # React
# FOLDER = 1    # Vue

app = Flask(__name__,
            static_folder=FOLDERS[FOLDER]['static_folder'],
            template_folder=FOLDERS[FOLDER]['template_folder'])
app.config.from_pyfile("./settings.py")


#
def callback():
    json_data = {
        'status': 'action-ng',
        'message': 'Session timeout has occurred.',
        'list': []
    }
    return jsonify(json_data)


login_manager = LoginManager()
login_manager.unauthorized_callback = callback
login_manager.init_app(app)


#
class User(UserMixin):
    def __init__(self, id_):
        self.id = id_


#
@login_manager.user_loader
def load_user(user_id):
    return User(user_id)


#
@app.route('/', methods=['GET'])
def index():
    response = make_response(render_template('index.html'))
    return response


# When Manipulate [Forward] Button, [Rewind] Button, [URL] Textbox at Browser
@app.errorhandler(404)
def not_found(e):
    response = make_response(render_template('index.html'))
    return response


#
@app.after_request
def after_request(response):
    response.headers['Cache-Control'] = 'private, no-store, no-cache, max-age=0, must-revalidate'
    response.headers['Expires'] = '0'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'SAMEORIGIN'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    return response


# favicon.ico
@app.route('/favicon.ico', methods=['GET'])
def favicon():
    return send_from_directory(os.path.join(app.root_path, FOLDERS[FOLDER]['template_folder']), 'favicon.ico')


# Web API: authorize
@app.route('/auth', methods=['POST'])
def auth():
    return auth_action.auth(request, login_user)


# Web API: un-authorize
@app.route('/unauth', methods=['POST'])
@login_required
def unauth():
    return unauth_action.unauth(logout_user)


# Web API: information
@app.route('/info', methods=['GET'])
@login_required
def info():
    return info_action.info(request, current_user)


# Web Server
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
