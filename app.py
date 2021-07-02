import os

from flask import Flask, redirect, render_template, request, session
from flask.templating import render_template_string
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.exceptions import HTTPException, InternalServerError, default_exceptions
from werkzeug.security import check_password_hash, generate_password_hash
from flask_sqlalchemy import SQLAlchemy

from helpers import login_required

app = Flask(__name__)

# connect to database
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:data@localhost/gamesweb"

db = SQLAlchemy(app)
# users table
class users(db.Model):
    __table_args__ = (db.UniqueConstraint("username", name="unique_username"),)
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String, nullable=False)

# TODO leaderboard table -_-

# auto-reload templates
app.config["TEMPLATES_AUTO_RELOAD"] = True

# responses not cached
@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

# use filesystem instead of cookies
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)


# app routes

@app.route("/")
def index():
    return render_template("layout.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if session["user_id"]:
        return redirect("/")

    if request.method == "POST":
        session.clear()

        if not request.form.get("username"):
            return "must provide username"

        if not request.form.get("password"):
            return "must provide password"

        # query user information
        rows = 

        # check password
        if len(rows) != 1 or not check_password_hash(rows[0]["hash"], request.form.get("password")):
            return "invalid username and/or password"

        session["user_id"] = rows[0]["id"]

        return redirect("/")

    else:
        return render_template("login.html")

@app.route("/logout")
def logout():
    session.clear()
    return redirect("/")

@app.route("/register", methods=["GET", "POST"])
def register():
    if session["user_id"]:
        return redirect("/")

    if request.method == "POST":
        session.clear()
        usern = request.form.get("username")
        passw = request.form.get("password")
        confirm = request.form.get("confirmation")

        # check username
        if not usern:
            return "Enter your username"

        # check password
        if not passw:
            return "Enter your password"

        # password lenght
        if len(passw) < 6:
            return "Password must be at least 6 characters long"

        # check if there is at leat one digit in password
        if not any(char.isdigit() for char in passw):
            return "Password must contain at least one number"

        # check confimation of password
        if not confirm:
            return "Confirm your password"

        # passwords match
        if request.form.get("password") != request.form.get("confirmation"):
            return "Passwords must match!"

        # generates hash
        passw = generate_password_hash(passw, method='pbkdf2:sha256', salt_length=8)

        # insert userame and hash into database
        user = users(username=usern, password=passw)
        db.session.add(user)
        db.session.commit()

        # login user and redirect to index page
        rows = 
        session["user_id"] = rows[0]["id"]

        return redirect("/")

@app.route("/bug", methods=["GET", "POST"])
@login_required
def bug():
    return render_template("bug.html")

# listen for errors
def errorhandler(e):
    """Handle error"""
    if not isinstance(e, HTTPException):
        e = InternalServerError()
    return e.name, e.code

for code in default_exceptions:
    app.errorhandler(code)(errorhandler)