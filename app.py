from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
import mysql.connector
import pymysql.cursors



app = Flask(__name__)


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

# Настройки подключения к базе данных
connection = pymysql.connect(
    host='CaVaBang.mysql.pythonanywhere-services.com',
    user='CaVaBang',
    password='2PacNotorious',
    database='CaVaBang$Clients',
    cursorclass=pymysql.cursors.DictCursor
)

@app.route('/submit_form', methods=['POST'])
def submit_form():
    name = request.form['name']
    phone = request.form['phone']
    email = request.form['email']
    message = request.form['message']

    with connection.cursor() as cursor:
        sql = "INSERT INTO bookings (name, phone, email, message) VALUES (%s, %s, %s, %s)"
        cursor.execute(sql, (name, phone, email, message))
        connection.commit()

    return redirect(url_for('thank_you'))


@app.route('/thank_you')
def thank_you():
    return 'Спасибо! Ваша заявка принята.'
