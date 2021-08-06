# GridGames <https://grid-games.herokuapp.com/>
#### Video Demo:  <https://www.youtube.com/watch?v=-ttqQJfbDzA>
#### Description:
GridGames is a flask web application where you can sign up and play few games that are based on grid.

#### These games include:
* [Memory game](#memory-game)
* [Whac-a-mole](#whac-a-mole)
* [Connect four](#connect-four)
* [Snake](#snake)
* [Space Invaders](#space-invaders)
* [Frogger](#frogger)
* [Tetris](#tetris)

### Memory game
In memory game you have to find all pairs of opening and closing HTML tags by flipping cards one by one. When you find pair they will stay flipped if don't they will flip back.
### Whac-a-mole
In whac-a-mole you have to hit mole as many times as you can in 20 seconds. Your score will be saved in leaderboard below.
### Connect four
Connect four is game for two players, where each must line up 4 circles horizontally, vertically or diagonaly, the first to succeed wins.
### Snake
In snake your task is to eat all apples and fill the playboard.
### Space Invaders
In space invaders you must shoot all aliens before they hit you or they get to earth.
### Frogger
In frogger your task is to get to the finish through obstacles like river or road.
### Tetris
In tetris you fill line with blocks, then it will disappear and you will gain score, your task is to repeat this as many times as you can before you reach top.

#
Whac-a-mole, Snake, Tetris have their own leaderboards table at the bottom where you can see score of top 20 players and your own. Other games doesn't have this, beacause they are not scored or they have maximum score you can easily obtain.

## Files
**Static** - in this folder are files used in multiple pages and folders for each game where are css, javascript files as well as images used only on that page.\
<br>
**Templates** - this folder contains all HTML files.\
<br>
**app.py** is default flask application.\
<br>
**helpers.py** contains login_required function and was meant to contain additional, but additional functions weren't needed.\
<br>
**games.py** contains all *app.routes* with games to be separated from other *app.routes* in **app.py**\
<br>
**Procfile**, **requirements.txt**, **runtime.txt** - these files contains information requiered for deploy on [heroku.com](https://heroku.com)