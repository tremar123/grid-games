import os

from flask import Flask, redirect, render_template, request, session
from flask.templating import render_template_string
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.exceptions import HTTPException, InternalServerError, default_exceptions
from werkzeug.security import check_password_hash, generate_password_hash

from helpers import login_required

app = Flask(__name__)

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


#app routes

@app.route("/")
def index():
    return render_template("layout.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    return render_template("login.html")

@app.route("/logout")
def logout():
    session.clear()
    return redirect("/")

@app.route("/register", methods=["GET", "POST"])
def register():
    return render_template("register.html")

@app.route("/bug", methods=["GET", "POST"])
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