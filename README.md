# GridGames <https://grid-games.herokuapp.com/>
#### Video Demo:  <https://www.youtube.com/watch?v=-ttqQJfbDzA>
#### Description:
GridGames is a flask web application where you can sign up and play few games that are based on the grid. You can change your password, delete an account or write contact us if you have any problems with GridGames web app functionality. And challenge other players to get the highest score of all in leaderboards.

#### Games you can play:
* [Memory game](#memory-game)
* [Whac-a-mole](#whac-a-mole)
* [Connect four](#connect-four)
* [Snake](#snake)
* [Space Invaders](#space-invaders)
* [Frogger](#frogger)
* [Tetris](#tetris)

### Memory game
In the Memory game, you have to find all pairs of opening and closing HTML tags by flipping cards one by one. When you find pair they will stay flipped, if you don't they will flip back.
### Whac-a-mole
In the Whac-a-mole, you have to hit the mole as many times as you can in 20 seconds. Your score will be saved in the leaderboard below.
### Connect four
Connect four is a game for two players, where each must line up 4 circles horizontally, vertically, or diagonally, the first to succeed wins.
### Snake
In the Snake, your task is to eat as many apples and fill the board as much as you can, without crashing with the wall or your own snake.
### Space Invaders
In the Space invaders, you must shoot all aliens before they hit you or they get to earth.
### Frogger
In the Frogger, your task is to get to the finish through the obstacles like a river or road in under 15 seconds.
### Tetris
In the Tetris, you must align falling blocks of different shapes to fill a full row, then the row will disappear and you will gain a 10 scores. And do this as many times as you can without crashing with the ceiling, if you crash then the game is over.

#
Whac-a-mole, Snake, Tetris have their own leaderboards table at the bottom where you can see the score of the top 20 players and your own. Other games do not have this, because they are not scored or they have a maximum score you can easily obtain.

## Files
**Static** - in this folder are files used in multiple pages and folders for each game where are CSS, JavaScript files as well as images used only on that page.

**Templates** - this folder contains all HTML files.

**app.py** is default the flask application.

**helpers.py** contains login_required function and was meant to contain additional, but additional functions weren't needed.

**games.py** contains all *app.routes* with games to be separated from other *app.routes* in **app.py**

**Procfile**, **requirements.txt**, **runtime.txt** - these files contains information requiered for deploy on [heroku.com](https://heroku.com)