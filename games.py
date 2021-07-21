from app import app
from flask import render_template
from helpers import login_required

@app.route("/memory-game")
# @login_required
def memory_game():
    return render_template("memory-game.html")

@app.route("/whac-a-mole")
# @login_required
def whac_a_mole():
    return render_template("whac-a-mole.html")

@app.route("/connect-four")
# @login_required
def connect_four():
    return render_template("connect-four.html")

@app.route("/snake")
# @login_required
def snake():
    return render_template("snake.html")

@app.route("/space-invaders")
def space_invaders():
    return render_template("space-invaders.html")

@app.route("/frogger")
def frogger():
    return render_template("frogger.html")

@app.route("/tetris")
def tetris():
    return render_template("tetris.html")