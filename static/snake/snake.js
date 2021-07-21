document.addEventListener("DOMContentLoaded", () => {
    const squares = document.querySelectorAll(".grid div");
    const scoreDisplay = document.querySelector("h3 span");
    const button = document.querySelector(".start");
    const pause = document.querySelector(".pause");

    const UP = document.querySelector("#up");
    const RIGHT = document.querySelector("#right");
    const LEFT = document.querySelector("#left");
    const DOWN = document.querySelector("#down");

    const width = 10;
    let currentIndex = 0;
    let appleIndex = 0;
    let currentSnake = [2, 1, 0];
    let direction = 1;
    let score = 0;
    let speed = 0.9;
    let intervalTime = 0;
    let interval = 0;

    //disable keys to move page
    window.addEventListener("keydown", function(e) {
        if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    }, false);

    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove("snake"));
        squares[appleIndex].classList.remove("apple");
        clearInterval(interval);
        score = 0;
        randomApple();
        direction = 1;
        scoreDisplay.innerHTML = score;
        intervalTime = 1000;
        currentSnake = [2, 1, 0];
        currentIndex = 0;
        currentSnake.forEach(index => squares[index].classList.add("snake"));
        interval = setInterval(moveOutComes, intervalTime);
        button.innerHTML = "Restart";
    }

    function moveOutComes() {
        //hitting border
        if (
            (currentSnake[0] + width >= (width * width) && direction === width) || //if hits bottom
            (currentSnake[0] % width === width -1 && direction === 1) || //if hits right
            (currentSnake[0] % width === 0 && direction === -1) || //if hits left
            (currentSnake[0] - width < 0 && direction === -width) || //if hits top
            squares[currentSnake[0] + direction].classList.contains("snake")
        ) {
            return swal({
                title: "GAME OVER!",
                text: "Your score: " + score,
                button: "Play again",
            }).then(() => {
                clearInterval(interval);
                startGame();
            });
        }

        const tail = currentSnake.pop();
        squares[tail].classList.remove("snake");
        currentSnake.unshift(currentSnake[0] + direction)

        //getting apple
        if (squares[currentSnake[0]].classList.contains("apple")) {
            squares[currentSnake[0]].classList.remove("apple");
            squares[tail].classList.add("snake");
            currentSnake.push(tail);
            randomApple();
            score++;
            scoreDisplay.textContent = score;
            clearInterval(interval);
            intervalTime = intervalTime * speed;
            interval = setInterval(moveOutComes, intervalTime);
        }
        squares[currentSnake[0]].classList.add("snake");
    }

    function randomApple() {
        do {
            appleIndex = Math.floor(Math.random() * squares.length);
        }
        while (squares[appleIndex].classList.contains("snake"))
        squares[appleIndex].classList.add("apple");
    }

    function control(e) {
        squares[currentIndex].classList.remove("snake");

        if (e.keyCode === 39) {
            direction = 1; //go right
        }
        else if (e.keyCode === 38) {
            direction = -width; //go up
        }
        else if (e.keyCode === 37) {
            direction = -1; //go left
        }
        else if (e.keyCode === 40) {
            direction = +width; //go down
        }
    }

    function pauseGame() {
        alert("Paused");
    }

    document.addEventListener("keyup", control);
    button.addEventListener("click", startGame);
    pause.addEventListener("click", pauseGame);
    UP.addEventListener("click", upBtn)
    RIGHT.addEventListener("click", rightBtn)
    LEFT.addEventListener("click", leftBtn)
    DOWN.addEventListener("click", downBtn)

    function rightBtn() {
        squares[currentIndex].classList.remove("snake");
        direction = 1;
    }
    function upBtn() {
        squares[currentIndex].classList.remove("snake");
        direction = -width;
    }
    function leftBtn() {
        squares[currentIndex].classList.remove("snake");
        direction = -1;
    }
    function downBtn() {
        squares[currentIndex].classList.remove("snake");
        direction = +width;
    }
})