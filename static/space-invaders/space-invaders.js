document.addEventListener("DOMContentLoaded", () => {
    const squares = document.querySelectorAll(".grid div");
    const resultDisplay = document.querySelector("#result");
    const divPlay = document.querySelector("#play-again");
    const left = document.querySelector("#left");
    const right = document.querySelector("#right");
    const shootBtn = document.querySelector("#shoot");

    let width = 15;
    let currentShooterIndex = 202;
    let currentInvaderIndex = 0;
    let alienInvadersTakenDown = [];
    let result = 0;
    let direction = 1;
    let invaderId;
    let key;

    //disable keys to move page
    window.addEventListener("keydown", function(e) {
        if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    }, false);

    //define invaders
    const alienInvaders = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
        30, 31, 32, 33, 34, 35, 36, 37, 38, 39
    ];

    //draw invaders
    alienInvaders.forEach(invader => squares[currentInvaderIndex + invader].classList.add("invader"));

    //draw shooter
    squares[currentShooterIndex].classList.add("shooter");

    //move shooter
    function moveShooter(e) {
        squares [currentShooterIndex].classList.remove("shooter");
        switch (e.keyCode) {
            case 37:
                if (currentShooterIndex % width !== 0) currentShooterIndex -= 1;
                break;
            case 39:
                if (currentShooterIndex % width < width -1) currentShooterIndex += 1;
                break;
        }
        squares[currentShooterIndex].classList.add("shooter");
    }

    document.addEventListener("keydown", moveShooter);
    
    //move invaders
    function moveInvaders() {
        const leftEdge = alienInvaders[0] % width === 0;
        const rightEdge = alienInvaders[alienInvaders.length -1] % width === width -1;

        if ((leftEdge && direction === -1) || (rightEdge && direction === 1)) {
            direction = width;
        }
        else if (direction === width) {
            if (leftEdge) direction = 1;
            else direction = -1;
        }
        
        for (let i = 0; i <= alienInvaders.length -1; i++) {
            squares[alienInvaders[i]].classList.remove("invader");
            alienInvaders[i] += direction;
        }
        for (let i = 0; i <= alienInvaders.length -1; i++) {
            if (!alienInvadersTakenDown.includes(i)) {
                squares[alienInvaders[i]].classList.add("invader");
            }
        }
        //lost
        if (squares[currentShooterIndex].classList.contains("invader", "shooter")) {
            document.removeEventListener("keyup", shoot);
            document.removeEventListener("keydown", moveShooter);
            left.removeEventListener("click", moveLeft);
            right.removeEventListener("click", moveRight);
            shootBtn.removeEventListener("click", shootByButton);
            resultDisplay.textContent = "Game Over";
            squares[currentShooterIndex].classList.add("boom");
            clearInterval(invaderId);
            createPlayAgainButton();
        }

        for (let i = 0; i <= alienInvaders.length -1; i++) {
            if (alienInvaders[i] > (squares.length - (width-1))) {
                document.removeEventListener("keyup", shoot);
                document.removeEventListener("keydown", moveShooter);
                resultDisplay.textContent = "Game Over";
                clearInterval(invaderId);
                createPlayAgainButton();
                return;
            }
        }
        //win
        if (alienInvadersTakenDown.length === alienInvaders.length) {
            clearInterval(invaderId);
            resultDisplay.textContent = "You win!";
            createPlayAgainButton();
        }
    }
    
    invaderId = setInterval(moveInvaders, 200);
    
    //shoot
    function shootLaser(key) {
        let laserId;
        let currentLaserIndex = currentShooterIndex;
        //move laser from shooter up
        function moveLaser() {
            squares[currentLaserIndex].classList.remove("laser");
            currentLaserIndex -= width;
            squares[currentLaserIndex].classList.add("laser");
            if (squares[currentLaserIndex].classList.contains("invader")) {
                squares[currentLaserIndex].classList.remove("laser", "invader");
                squares[currentLaserIndex].classList.add("boom");

                setTimeout(() => squares[currentLaserIndex].classList.remove("boom"), 250);
                clearInterval(laserId);

                const alienTakenDown = alienInvaders.indexOf(currentLaserIndex);
                alienInvadersTakenDown.push(alienTakenDown);
                result++;
                resultDisplay.textContent = result;
            }

            if (currentLaserIndex < width) {
                clearInterval(laserId);
                setTimeout(() => squares[currentLaserIndex].classList.remove("laser"), 100);
            }
        }

        switch(key) {
            case 32:
                laserId = setInterval(moveLaser, 100);
                key = 0;
                break;
        }
    }

    function moveLeft() {
        squares [currentShooterIndex].classList.remove("shooter");
        if (currentShooterIndex % width !== 0) currentShooterIndex -= 1;
        squares[currentShooterIndex].classList.add("shooter");
    }

    function moveRight() {
        squares [currentShooterIndex].classList.remove("shooter");
        if (currentShooterIndex % width < width -1) currentShooterIndex += 1;
        squares[currentShooterIndex].classList.add("shooter");
    }

    function shoot(e) {
        if (e.keyCode === 32) {
            key = 32;
            shootLaser(key);
        }
    }

    function shootByButton() {
        key = 32;   
        shootLaser(key);
    }

    document.addEventListener("keyup", shoot);
    left.addEventListener("click", moveLeft);
    right.addEventListener("click", moveRight);
    shootBtn.addEventListener("click", shootByButton);

    function createPlayAgainButton() {
        let button = document.createElement("button");
        button.classList.add("btn");
        button.innerHTML = "Play Again";
        button.setAttribute("onclick", "window.location.reload();");
        divPlay.appendChild(button);
    }
})