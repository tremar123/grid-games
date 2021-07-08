from app import app
from flask import render_template
from helpers import login_required

@app.route("/memory-game")
# @login_required
def memory():
    return render_template("memory-game.html")