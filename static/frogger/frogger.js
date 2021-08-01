document.addEventListener("DOMContentLoaded", () => {
    const squares = document.querySelectorAll(".grid div");
    const timeLeft = document.querySelector("#time-left");
    const result = document.querySelector("#result");
    const startBtn = document.querySelector("#button");
    const carsLeft = document.querySelectorAll(".car-left");
    const carsRight = document.querySelectorAll(".car-right");
    const logsLeft = document.querySelectorAll(".log-left");
    const logsRight = document.querySelectorAll(".log-right");
    
    const UP = document.querySelector("#up");
    const RIGHT = document.querySelector("#right");
    const LEFT = document.querySelector("#left");
    const DOWN = document.querySelector("#down");
    
    const width = 9;
    let currentIndex = 103;
    let currentTime = 15;
    let timerId;

    //render frog on start
    squares[currentIndex].classList.add("frog");

    //disable keys to move page
    window.addEventListener("keydown", function(e) {
        if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    }, false);

    //move frog
    function moveFrog(e) {
        squares[currentIndex].classList.remove("frog");
        switch(e.keyCode) {
            case 37:
                if (currentIndex % width !== 0) currentIndex -= 1;
                break;
            case 38:
                if (currentIndex - width >= 0) currentIndex -= width;
                break;
            case 39:
                if (currentIndex % width < width - 1) currentIndex += 1;
                break;
            case 40:
                if (currentIndex + width < width * width) currentIndex += width;
                break;
        }
        squares[currentIndex].classList.add("frog");
        lose();
        win();
    }

    //move cars
    function autoMoveCars() {
        carsLeft.forEach(carLeft => moveCarLeft(carLeft));
        carsRight.forEach(carRight => moveCarRight(carRight));
    }

    function moveCarLeft(carLeft) {
        switch (true) {
            case carLeft.classList.contains("c1"):
                carLeft.classList.remove("c1");
                carLeft.classList.add("c2");
                break;
            case carLeft.classList.contains("c2"):
                carLeft.classList.remove("c2");
                carLeft.classList.add("c3");
                break;
            case carLeft.classList.contains("c3"):
                carLeft.classList.remove("c3");
                carLeft.classList.add("c1");
                break;
        }
    }

    function moveCarRight(carRight) {
        switch (true) {
            case carRight.classList.contains("c1"):
                carRight.classList.remove("c1");
                carRight.classList.add("c3");
                break;
            case carRight.classList.contains("c2"):
                carRight.classList.remove("c2");
                carRight.classList.add("c1");
                break;
            case carRight.classList.contains("c3"):
                carRight.classList.remove("c3");
                carRight.classList.add("c2");
                break;
        }
    }

    //move logs
    function autoMoveLogs() {
        logsLeft.forEach(logLeft => moveLogLeft(logLeft));
        logsRight.forEach(logRight => moveLogRight(logRight));
    }

    function moveLogLeft(logLeft) {
        switch (true) {
            case logLeft.classList.contains("l1"):
                logLeft.classList.remove("l1");
                logLeft.classList.add("l2");
                break;
            case logLeft.classList.contains("l2"):
                logLeft.classList.remove("l2");
                logLeft.classList.add("l3");
                break;
            case logLeft.classList.contains("l3"):
                logLeft.classList.remove("l3");
                logLeft.classList.add("l4");
                break;
            case logLeft.classList.contains("l4"):
                logLeft.classList.remove("l4");
                logLeft.classList.add("l5");
                break;
            case logLeft.classList.contains("l5"):
                logLeft.classList.remove("l5");
                logLeft.classList.add("l1");
                break;
        }
    }

    function moveLogRight(logRight) {
        switch (true) {
            case logRight.classList.contains("l1"):
                logRight.classList.remove("l1");
                logRight.classList.add("l5");
                break;
            case logRight.classList.contains("l2"):
                logRight.classList.remove("l2");
                logRight.classList.add("l1");
                break;
            case logRight.classList.contains("l3"):
                logRight.classList.remove("l3");
                logRight.classList.add("l2");
                break;
            case logRight.classList.contains("l4"):
                logRight.classList.remove("l4");
                logRight.classList.add("l3");
                break;
            case logRight.classList.contains("l5"):
                logRight.classList.remove("l5");
                logRight.classList.add("l4");
                break;
        }
    }

    function win() {
        if (squares[4].classList.contains("frog")) {
            squares[currentIndex].classList.remove("frog");
            clearInterval(timerId);
            document.removeEventListener("keyup", moveFrog);
            return swal({
                title: "You won!",
                button: "Play Again!"
            }).then(() => {
                location.reload();
            })
        }
    }

    function lose() {
        if ((currentIndex === 0) || (squares[currentIndex].classList.contains("c1"))
        || (squares[currentIndex].classList.contains("l5"))
        || (squares[currentIndex].classList.contains("l4"))) {
            squares[currentIndex].classList.remove("frog");
            clearInterval(timerId);
            document.removeEventListener("keyup", moveFrog);
            return swal({
                title: "You lost!",
                button: "Play Again!"
            }).then(() => {
                location.reload();
            })
        }
    }

    //move frog with log left
    function moveWithLogLeft() {
        if (currentIndex >= 27 && currentIndex < 35) {
            squares[currentIndex].classList.remove("frog");
            currentIndex += 1;
            squares[currentIndex].classList.add("frog");
        }
    }

    function moveWithLogRight() {
        if (currentIndex > 18 && currentIndex <= 26) {
            squares[currentIndex].classList.remove("frog");
            currentIndex -= 1;
            squares[currentIndex].classList.add("frog");
        }
    }

    //move everithing
    function moveEverything() {
        currentTime--;
        timeLeft.textContent = currentTime;
        if (currentTime === 0) {
            clearInterval(timerId);
            document.removeEventListener("keyup", moveFrog);
            return swal({
                title: "You lost!",
                button: "Play Again!"
            }).then(() => {
                location.reload();
            })
        }
        autoMoveCars();
        autoMoveLogs();
        moveWithLogLeft();
        moveWithLogRight();
        lose();
    }

    //start game
    startBtn.addEventListener("click", () => {
        timerId = setInterval(moveEverything, 1000);
        document.addEventListener("keyup", moveFrog);
        startBtn.style.visibility = "hidden";
        UP.addEventListener("click", upBtn);
        RIGHT.addEventListener("click", rightBtn);
        LEFT.addEventListener("click", leftBtn);
        DOWN.addEventListener("click", downBtn);
    });


    function rightBtn() {
        squares[currentIndex].classList.remove("frog");
        if (currentIndex % width < width - 1) currentIndex += 1;
        squares[currentIndex].classList.add("frog");
        lose();
        win();
    }
    function upBtn() {
        squares[currentIndex].classList.remove("frog");
        if (currentIndex - width >= 0) currentIndex -= width;
        squares[currentIndex].classList.add("frog");
        lose();
        win();
    }
    function leftBtn() {
        squares[currentIndex].classList.remove("frog");
        if (currentIndex % width !== 0) currentIndex -= 1;
        squares[currentIndex].classList.add("frog");
        lose();
        win();
    }
    function downBtn() {
        squares[currentIndex].classList.remove("frog");
        if (currentIndex + width < width * width) currentIndex += width;
        squares[currentIndex].classList.add("frog");
        lose();
        win();
    }
});