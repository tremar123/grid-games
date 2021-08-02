from flask import Flask, redirect, render_template, request, session
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.exceptions import HTTPException, InternalServerError, default_exceptions
from werkzeug.security import check_password_hash, generate_password_hash
from flask_sqlalchemy import SQLAlchemy

from helpers import login_required

app = Flask(__name__)

# connect to database
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://zrvuokpulkgbtb:e88845a60c0a80c98a78414a82559910edb08da67332294689fb9300e38572f0@ec2-54-220-53-223.eu-west-1.compute.amazonaws.com:5432/d38gad1m26bicr"

db = SQLAlchemy(app)


# users table
class users(db.Model):
    __table_args__ = (db.UniqueConstraint("username", name="unique_username"),)
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String, nullable=False)

# bugs table
class bugs(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    email = db.Column(db.String)
    text = db.Column(db.String, nullable=False)
    browser = db.Column(db.String)

# snake table
class snake(db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)
    score = db.Column(db.Integer, nullable=False)

# whac a mole table
class whac_a_mole(db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)
    score = db.Column(db.Integer, nullable=False)

# tetris table
class tetris(db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)
    score = db.Column(db.Integer, nullable=False)

import games

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

# stay logged in after closing browser
@app.before_request
def make_session_permanent():
    session.permanent = True

# app routes

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    session.clear()
    if request.method == "POST":

        # check if username entered
        if not request.form.get("username"):
            return render_template("login.html", message="Enter username!")

        # check if password entered
        if not request.form.get("password"):
            return render_template("login.html", message="Enter password!")

        # query user information
        rows = users.query.filter_by(username=request.form.get("username")).first()

        # check password
        try:
            if check_password_hash(rows.password, request.form.get("password")):
                session["user_id"] = rows.id
                return redirect("/")
            else:
                return render_template("login.html", message="Invalid creditials!")
        except AttributeError:
            return render_template("login.html", message="Invalid creditials!")
    else:
        return render_template("login.html")

@app.route("/logout")
def logout():
    session.clear()
    return redirect("/")

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        session.clear()
        username = request.form.get("username")
        password = request.form.get("password")
        confirm = request.form.get("confirmation")

        # check if username is taken
        try:
            if username == users.query.filter_by(username=username).first().username:
                return render_template("register.html", message="Username already taken!")
        except AttributeError:
            
            # check username
            if not username:
                return render_template("register.html", message="Enter username!")

            # check password
            if not password:
                return render_template("register.html", message="Enter password!")

            # password lenght
            if len(password) < 6:
                return render_template("register.html", message="Password must be at least 6 characters long!", ID="password")

            # check if there is at leat one digit in password
            if not any(char.isdigit() for char in password):
                return render_template("register.html", message="Password must contain at least one number!", ID="password")

            # check confimation of password
            if not confirm:
                return render_template("register.html", message="Confirm your password!", ID="confirm")

            # passwords match
            if request.form.get("password") != request.form.get("confirmation"):
                return render_template("register.html", message="Passwords must match!", ID="confirm")

            # generates hash
            password = generate_password_hash(password, method='pbkdf2:sha256', salt_length=8)

            # insert userame and hash into database
            user = users(username=username, password=password)
            db.session.add(user)
            db.session.commit()

            # login user and redirect to index page
            rows = users.query.filter_by(username=request.form.get("username")).first()
            session["user_id"] = rows.id
            return redirect("/")

    else:
        return render_template("register.html")


@app.route("/bug", methods=["GET", "POST"])
def bug():
    if request.method == "POST":
        try:
            bug = bugs(user_id=session["user_id"], email=request.form.get("email"), text=request.form.get("issue"), browser=request.headers.get("User-Agent"))
            db.session.add(bug)
            db.session.commit()
            return render_template("bug_thanks.html")
        except KeyError:
            bug = bugs(email=request.form.get("email"), text=request.form.get("issue"), browser=request.headers.get("User-Agent"))
            db.session.add(bug)
            db.session.commit()
            return render_template("bug_thanks.html")
    else:
        return render_template("bug.html")


# listen for errors
def errorhandler(e):
    """Handle error"""
    if not isinstance(e, HTTPException):
        e = InternalServerError()
    return e.name, e.code

for code in default_exceptions:
    app.errorhandler(code)(errorhandler)