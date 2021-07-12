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