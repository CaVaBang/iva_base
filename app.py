from flask import Flask, render_template

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