#
# Lab Flask
#
# Date    : 2024-04-30
# Auther  : Hirotoshi FUJIBE
# History :
#

from flask import jsonify

from mapper import select_mapper


# info
def info(request, current_user) -> jsonify:

    json_data = {
        'status': '',
        'message': '',
        'list': []
    }

    if not current_user.is_authenticated:
        json_data['status'] = 'action-ng'
        json_data['message'] = 'Session timeout has occurred.'
        return jsonify(json_data)

    # sample for refer to session.
    user_name = current_user.id

    query_type = request.args.get('type')
    if query_type is None or query_type not in ['home', 'settings']:
        json_data['status'] = 'action-ng'
        json_data['message'] = 'Invalid Request.'
        return jsonify(json_data)

    try:
        sql = 'SELECT PRODUCT_NAME, PRODUCT_DESC FROM LAB_FLASK.PRODUCT_LIST'
        result = select_mapper.select(sql, [])
    except Exception:  # noqa
        json_data['status'] = 'action-ng'
        json_data['message'] = 'Unknown trouble has occurred.'
        return jsonify(json_data)

    json_data['status'] = 'action-ok'
    json_data['message'] = ''
    json_data['list'] = result
    return jsonify(json_data)
