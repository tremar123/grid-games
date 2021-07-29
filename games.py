from flask_session import Session
from app import app, session, db, snake, tetris, whac_a_mole, users
from flask import render_template, request
from helpers import login_required

@app.route("/memory-game")
@login_required
def memory_game():
    return render_template("memory-game.html")

@app.route("/whac-a-mole", methods=["GET", "POST"])
@login_required
def whac_a_mole_game():
    if request.method == "POST":

        score = int(request.form["score"])  # get score in current game
        try:     # get max score and update if current is bigger if none add new row into table
            maxScore = whac_a_mole.query.filter_by(user_id=session["user_id"]).first()
            print(maxScore.score)
            if score > maxScore.score:
                db.engine.execute("UPDATE whac_a_mole SET score = %(score)s WHERE user_id = %(user)s", {"user": session["user_id"], "score": score})

        except AttributeError:
            # new row
            newUser = whac_a_mole(user_id=session["user_id"], score=score)
            db.session.add(newUser)
            db.session.commit()

        return render_template("whac-a-mole.html")
    else:
        leaderboard = db.engine.execute("SELECT whac_a_mole.score, users.username FROM whac_a_mole INNER JOIN users ON whac_a_mole.user_id = users.id ORDER BY whac_a_mole.score DESC LIMIT 20")
        return render_template("whac-a-mole.html", leaderboard=leaderboard)

@app.route("/connect-four")
@login_required
def connect_four():
    return render_template("connect-four.html")

@app.route("/snake", methods=["GET", "POST"])
@login_required
def snake_game():
    if request.method == "POST":

        score = int(request.form["score"])  # get score in current game
        try:     # get max score and update if current is bigger if none add new row into table
            maxScore = snake.query.filter_by(user_id=session["user_id"]).first()
            print(maxScore.score)
            if score > maxScore.score:
                db.engine.execute("UPDATE snake SET score = %(score)s WHERE user_id = %(user)s", {"user": session["user_id"], "score": score})

        except AttributeError:
            # new row
            newUser = snake(user_id=session["user_id"], score=score)
            db.session.add(newUser)
            db.session.commit()

        return render_template("snake.html")
    else:
        leaderboard = db.engine.execute("SELECT snake.score, users.username FROM snake INNER JOIN users ON snake.user_id = users.id ORDER BY snake.score DESC LIMIT 20")
        return render_template("snake.html", leaderboard=leaderboard)

@app.route("/space-invaders")
@login_required
def space_invaders():
    return render_template("space-invaders.html")

@app.route("/frogger")
@login_required
def frogger():
    return render_template("frogger.html")

@app.route("/tetris", methods=["GET", "POST"])
@login_required
def tetris_game():
    if request.method == "POST":

        score = int(request.form["score"])  # get score in current game
        try:     # get max score and update if current is bigger if none add new row into table
            maxScore = tetris.query.filter_by(user_id=session["user_id"]).first()
            print(maxScore.score)
            if score > maxScore.score:
                db.engine.execute("UPDATE tetris SET score = %(score)s WHERE user_id = %(user)s", {"user": session["user_id"], "score": score})

        except AttributeError:
            # new row
            newUser = tetris(user_id=session["user_id"], score=score)
            db.session.add(newUser)
            db.session.commit()

        return render_template("tetris.html")
    else:
        leaderboard = db.engine.execute("SELECT tetris.score, users.username FROM tetris INNER JOIN users ON tetris.user_id = users.id ORDER BY tetris.score DESC LIMIT 20")
        return render_template("tetris.html", leaderboard=leaderboard)