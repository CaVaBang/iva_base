import smtplib
import os
import sys

sys.path.append('/home/c/cj34869/public_html/env/lib/python3.6/site-packages/')

from flask import Flask, render_template, request, redirect, url_for, jsonify
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask_sqlalchemy import SQLAlchemy
import mysql.connector
import pymysql.cursors

app = Flask(__name__)
application = app

@app.route('/')
@app.route('/index.html')
def home():
    return render_template('index.html')


@app.route('/about.html')
def about():
    return render_template('about.html')


@app.route('/booking.html')
def booking():
    return render_template('booking.html')


@app.route('/map.html')
def blog():
    return render_template('map.html')


@app.route('/contact.html')
def contact():
    return render_template('contact.html')


# Подключения к базе данных
connection = pymysql.connect(
    host='localhost',
    user='cj34869_bookings',
    password='igYz6qO2UP@!',
    database='cj34869_bookings',
    charset='utf8mb4',
    cursorclass=pymysql.cursors.DictCursor
)


@app.route('/submit_form', methods=['POST'])
def submit_form():
    name = request.form['name']
    phone = request.form['phone']
    email = request.form['email']
    message = request.form['message']
    check_in = request.form['check_in']
    check_out = request.form['check_out']
    guests = request.form['guests']

    with connection.cursor() as cursor:
        sql = """INSERT INTO bookings (name, phone, email, message, check_in, check_out, guests)
                 VALUES (%s, %s, %s, %s, %s, %s, %s)"""
        cursor.execute(sql, (name, phone, email, message, check_in, check_out, guests))
        connection.commit()

    send_email(name, phone, email, message, check_in, check_out, guests)

    return '', 200


def send_email(name, phone, email, message, check_in, check_out, guests):
    smtp_server = "smtp.timeweb.ru"
    smtp_port = 465
    smtp_login = "cj34869@cj34869.tw1.ru"
    smtp_password = "igYz6qO2UP@!"

    # Создание сообщения
    msg = MIMEMultipart()
    msg['From'] = smtp_login
    msg['To'] = 'musnigga@mail.ru'
    msg['Subject'] = "Новая запись"

    # Текст сообщения
    body = f"""
    Новая запись:
    Имя: {name}
    Телефон: {phone}
    Email: {email}
    Сообщение: {message}
    Дата заезда: {check_in}
    Дата выезда: {check_out}
    Количество гостей: {guests}
    """

    msg.attach(MIMEText(body, 'plain'))

    try:
        server = smtplib.SMTP_SSL(smtp_server, smtp_port)
        server.login(smtp_login, smtp_password)
        server.send_message(msg)
        server.quit()
        print("Email sent successfully")
    except Exception as e:
        print(f"Failed to send email: {e}")
