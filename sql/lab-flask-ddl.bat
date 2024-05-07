@echo off
echo lab-flask - DDL
echo root password is "********"
call "C:\Program Files\MySQL\MySQL Server 8.1\bin\mysql.exe" -u root -p --default-character-set=utf8 < ./lab-flask-ddl.sql
if not %ERRORLEVEL% equ 0 pause
