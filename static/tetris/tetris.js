document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".grid");
    const displayScore = document.querySelector("#score");
    const displaySquares = document.querySelectorAll(".previous-grid div");
    let squares = Array.from(grid.querySelectorAll(".grid div"));
    const startBtn = document.querySelector("#start");

    const UP = document.querySelector("#up");
    const RIGHT = document.querySelector("#right");
    const LEFT = document.querySelector("#left");
    const DOWN = document.querySelector("#down");

    const width = 10;
    const height = 20;
    let currentPosition = 4;
    let timerId;
    let score = 0;
    let currentIndex;

    window.addEventListener("keydown", function(e) {
        if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    }, false);

    function control(e) {
        switch (e.keyCode) {
            case 39:
                moveRight();
                break;
            case 38:
                rotate();
                break;
            case 37:
                moveLeft();
                break;
            case 40:
                moveDown();
                break;
        }
    }
    document.addEventListener("keydown", control);

    const lTetromino = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2]
    ]
    
    const zTetromino = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1]
    ]
    
    const tTetromino = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
    ]
    
    const oTetromino = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
    ]
    
    const iTetromino = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
    ]

    const tetrominos = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

    //random tetromino
    let random = Math.floor(Math.random()*tetrominos.length);
    let currentRotation = 0;
    let current = tetrominos[random][currentRotation];
    
    //draw tetromino
    function draw() {
        current.forEach(index => (
            squares[currentPosition + index].classList.add("block")
        ))
    }

    //undraw shape
    function undraw() {
        current.forEach(index => (
            squares[currentPosition + index].classList.remove("block")
        ))
    }

    //move tetromino down
    function moveDown() {
        undraw();
        currentPosition = currentPosition += width;
        draw();
        freeze();
    }

    //move left and prevent collision
    function moveRight() {
        undraw();
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1);
        if (!isAtRightEdge) currentPosition += 1;
        if (current.some(index => squares[currentPosition + index].classList.contains("block2"))) {
            currentPosition -= 1;
        }
        draw();
    }

    function moveLeft() {
        undraw();
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
        if (!isAtLeftEdge) currentPosition -= 1;
        if (current.some(index => squares[currentPosition + index].classList.contains("block2"))) {
            currentPosition  += 1;
        }
        draw();
    }

    //rotate tetromino
    function rotate() {
        undraw();
        currentRotation++;
        if (currentRotation === current.length) {
            currentRotation = 0;
        }
        current = tetrominos[random][currentRotation];
        draw();
    }
    
    //show previous tetromino
    const displayWidth = 4;
    const displayIndex = 0;
    let nextRandom = 0;

    const smallTetrominoes = [
        [1, displayWidth + 1, displayWidth * 2 + 1, 2], // L
        [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], // z
        [1, displayWidth, displayWidth + 1, displayWidth + 2], // T
        [0, 1, displayWidth, displayWidth + 1], // O
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] // I
    ]

    function displayShape() {
        displaySquares.forEach(square => {
            square.classList.remove("block");
        })
            smallTetrominoes[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add("block");
        })
    }
    
    //freeze
    function freeze() {
        if (current.some(index => squares[currentPosition + index + width].classList.contains("block3")
        || squares[currentPosition + index + width].classList.contains("block2"))) {
            current.forEach(index => squares[index + currentPosition].classList.add("block2"));
            random = nextRandom;
            nextRandom = Math.floor(Math.random() * tetrominos.length);
            current = tetrominos[random][currentRotation];
            currentPosition = 4;
            draw();
            displayShape();
            gameOver();
            addScore();
        }
    }

    startBtn.addEventListener("click", () => {
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
        } else {
            draw();
            timerId = setInterval(moveDown, 1000);
            nextRandom = Math.floor(Math.random() * tetrominos.length);
            displayShape();
        }
    })

    //game over
    function gameOver() {
        if (current.some(index => squares[currentPosition + index].classList.contains("block2"))){
            clearInterval(timerId);
            document.removeEventListener("keydown", control);
            return swal({
                title: "Game Over!",
                text: "Your score: " + score,
                button: "Play Again"
            }).then(() => {
                location.reload();
            })
        }
    }

    //add score
    function addScore () {
        for (currentIndex = 0; currentIndex < 199; currentIndex += width) {
            const row = [currentIndex, currentIndex+1, currentIndex+2, currentIndex+3, currentIndex+4, currentIndex+5, currentIndex+6, currentIndex+7, currentIndex+8, currentIndex+9];
            if (row.every(index => squares[index].classList.contains("block2"))) {
                score += 10;
                displayScore.innerHTML = score;
                row.forEach(index => {
                    squares[index].classList.remove("block2") || squares[index].classList.remove("block");
                });
                
                //splice array
                const squaresRemoved = squares.splice(currentIndex, width);
                squares = squaresRemoved.concat(squares);
                squares.forEach(cell => grid.appendChild(cell));
            }
        }
    }

    UP.addEventListener("mousedown", upBtn);
    RIGHT.addEventListener("mousedown", rightBtn);
    LEFT.addEventListener("mousedown", leftBtn);
    DOWN.addEventListener("mousedown", downBtn);

    function rightBtn() {
        moveRight();
    }
    function upBtn() {
        rotate();
    }
    function leftBtn() {
        moveLeft();
    }
    function downBtn() {
        moveDown();
    }
});