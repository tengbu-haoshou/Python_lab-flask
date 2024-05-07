#
# Lab Flask
#
# Date    : 2024-04-30
# Auther  : Hirotoshi FUJIBE
# History :
#

import mysql.connector


#
def select(sql, in_params):
    try:
        db_host = 'localhost'
        db_port = '3306'
        db_name = 'LAB_FLASK'
        db_user = 'LAB_FLASK_USER'
        db_password = 'Asdf1234'
        connect = mysql.connector.connect(
            host=db_host, port=db_port, db=db_name, user=db_user, passwd=db_password, charset="utf8")
        cursor = connect.cursor(dictionary=True)
        cursor.execute(sql, in_params)
        result = cursor.fetchall()
        connect.commit()
        connect.close()
    except Exception as ex:
        raise Exception(ex)

    return result
