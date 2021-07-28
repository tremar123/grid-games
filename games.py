from flask_session import Session
from app import app, session, db
from flask import render_template, request
from helpers import login_required

@app.route("/memory-game")
@login_required
def memory_game():
    return render_template("memory-game.html")

@app.route("/whac-a-mole")
@login_required
def whac_a_mole():
    return render_template("whac-a-mole.html")

@app.route("/connect-four")
@login_required
def connect_four():
    return render_template("connect-four.html")

@app.route("/snake", methods=["GET", "POST"])
@login_required
def snake():
    if request.method == "POST":
        score = int(request.form["score"])
        user = int(session["user_id"])
        db.engine.execute("INSERT INTO snake (user_id, score) VALUES (%(user)s, %(score)s)", {"user": user, "score": score})
        # TODO: updating on user somehow!!!!
        return
    else:
        return render_template("snake.html")

@app.route("/space-invaders")
@login_required
def space_invaders():
    return render_template("space-invaders.html")

@app.route("/frogger")
@login_required
def frogger():
    return render_template("frogger.html")

@app.route("/tetris")
@login_required
def tetris():
    return render_template("tetris.html")