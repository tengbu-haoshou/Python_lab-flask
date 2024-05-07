@echo off
echo lab-flask - DML
echo LAB_FLASK_USER password is "Asdf1234"
"C:\Program Files\MySQL\MySQL Server 8.1\bin\mysql.exe" -u LAB_FLASK_USER -p --default-character-set=utf8 < ./lab-flask-dml.sql
if not %ERRORLEVEL% equ 0 pause
