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
    user='cj34869',
    password='igYz6qO2UP@!',
    database='cj34869_bookings',
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

    return '', 200
#
#
# def send_email(subject, body, to_email):
#     from_email = 'test_the_iva_site@mail.ru'
#     password = '10923874q'
#
#     # Настройка MIME сообщения
#     msg = MIMEMultipart()
#     msg['From'] = from_email
#     msg['To'] = to_email
#     msg['Subject'] = subject
#
#     msg.attach(MIMEText(body, 'plain'))
#
#     # Настройка SMTP сервера
#     server = smtplib.SMTP_SSL('smtp.mail.ru', 465)
#     server.login(from_email, password)
#     text = msg.as_string()
#     server.sendmail(from_email, to_email, text)
#     server.quit()

