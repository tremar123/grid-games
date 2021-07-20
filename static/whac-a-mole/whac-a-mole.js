const button = document.createElement("button");

window.onload = startGame;

//generate starting button
function startGame() {
    button.classList.add("btn");
    button.innerHTML = "Start!";
    button.addEventListener("click", game);
    const div = document.querySelector(".button").appendChild(button);
}

function game() {
    //remove start button and start game
    button.remove();
    const square = document.querySelectorAll(".square");
    const mole = document.querySelectorAll(".mole");
    const timeLeft = document.querySelector("#time-left");
    let score = document.querySelector("#score");

    let result = 0;
    let currentTime = timeLeft.textContent;
    
    //remove mole from all squares and add it to random one
    function randomSquare() {
        square.forEach(className => {
            className.classList.remove("mole");
        })
        let randomPosition = square[Math.floor(Math.random() * 9)];
        randomPosition.classList.add("mole");
        
        //assign id of the randomPosition to hitPosition
        hitPosition = randomPosition.id;
    }
    
    //check if clicked position match where mole is
    square.forEach (id => {
        id.addEventListener("mouseup", () => {
            if (id.id == hitPosition) {
                result++;
                score.textContent = result;
            } else {
                id.style.borderColor = "red";
                setInterval(function() {
                    id.style.borderColor = "#5ccfe6";
                }, 300);
                result--;
                score.textContent = result;
            } 
        })
    })
    
    function moveMole() {
        let timerId = null;
        timerId = setInterval(randomSquare, 600);
    }
    
    moveMole();
    let timerId = setInterval(countdown, 1000);
    
    //timer
    function countdown() {
        currentTime--;
        timeLeft.textContent = currentTime;
        
        if (currentTime === 0) {
            clearInterval(timerId);
            swal({
                title: "GAME OVER!",
                text: "Your score: " + result,
                button: "Play again",
            }).then(() => {
                location.reload();
            });
        }
    }
}