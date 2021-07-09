document.addEventListener("DOMContentLoaded", main)
function main() {

    //cards array
    const cardsArray = [
        {
            name: "a",
            img: "/static/memory-game/images/a.svg"
        },
        {
            name: "a",
            img: "/static/memory-game/images/a1.svg"
        },
        {
            name: "body",
            img: "/static/memory-game/images/body.svg"
        },
        {
            name: "body",
            img: "/static/memory-game/images/body1.svg"
        },
        {
            name: "button",
            img: "/static/memory-game/images/button.svg"
        },
        {
            name: "button",
            img: "/static/memory-game/images/button1.svg"
        },
        {
            name: "div",
            img: "/static/memory-game/images/div.svg"
        },
        {
            name: "div",
            img: "/static/memory-game/images/div1.svg"
        },
        {
            name: "form",
            img: "/static/memory-game/images/form.svg"
        },
        {
            name: "form",
            img: "/static/memory-game/images/form1.svg"
        },
        {
            name: "h1",
            img: "/static/memory-game/images/h1.svg"
        },
        {
            name: "h1",
            img: "/static/memory-game/images/h11.svg"
        },
        {
            name: "head",
            img: "/static/memory-game/images/head.svg"
        },
        {
            name: "head",
            img: "/static/memory-game/images/head1.svg"
        },
        {
            name: "html",
            img: "/static/memory-game/images/html.svg"
        },
        {
            name: "html",
            img: "/static/memory-game/images/html1.svg"
        },
        {
            name: "nav",
            img: "/static/memory-game/images/nav.svg"
        },
        {
            name: "nav",
            img: "/static/memory-game/images/nav1.svg"
        },
    ]

    cardsArray.sort(() => 0.5 - Math.random());
    
    const grid = document.querySelector(".grid");
    const resultDisplay = document.querySelector("#result");
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsFound = [];

    //create board
    
    //check for matches
    function checkForMatch() {
        const cards = document.querySelectorAll(".cards");
        const firstId = cardsChosenId[0];
        const secondId = cardsChosenId[1];
        
        if (firstId == secondId) {
            cards[firstId].setAttribute("src", "/static/memory-game/images/blank.svg")
            cards[secondId].setAttribute("src", "/static/memory-game/images/blank.svg")
        }
        else if (cardsChosen[0] === cardsChosen[1]) {
            cards[firstId].removeEventListener("click", flipCard)
            cards[secondId].removeEventListener("click", flipCard)
            cardsFound.push(cardsChosen);
        } else {
            cards[firstId].setAttribute("src", "/static/memory-game/images/blank.svg");
            cards[secondId].setAttribute("src", "/static/memory-game/images/blank.svg");
        }
        //clear arrays
        cardsChosen = [];
        cardsChosenId = [];
        resultDisplay.textContent = cardsFound.length;
        
        if (cardsFound.length === cardsArray.length/2) {
            document.querySelector("h3").innerHTML = "All pair found! Congratulations";
            
            for (let i = 0; i < cards.length; i++){
                cards[i].removeEventListener("click", flipCard)
            }
            
            //create button that restarts game
            const main = document.querySelector("main");
            const button = document.createElement("button");
            button.classList.add("btn");
            button.setAttribute("onclick", "restart()")
            button.innerHTML = "Play again!"
            main.appendChild(button);
        }
    }
    
    //flip card
    function flipCard() {
        let cardId = this.getAttribute("data-id");
        cardsChosen.push(cardsArray[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute("src", cardsArray[cardId].img);
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }
    
    
    window.onload = createBoard(grid, cardsArray, flipCard);
    
}

function restart() {
    let h = document.querySelector("h3");
    h.innerHTML = "Score:<span id='result'>0</span>";
    document.querySelectorAll('.cards').forEach(e => e.remove());
    document.querySelectorAll('.btn').forEach(e => e.remove());
    main();
}

function createBoard(grid, cardsArray, flipCard) {
    for (let i = 0; i < cardsArray.length; i++) {
        const card = document.createElement("img");
        card.classList.add("cards");
        card.setAttribute("src", "/static/memory-game/images/blank.svg");
        card.setAttribute("data-id", i);
        card.addEventListener("click", flipCard);
        grid.appendChild(card);
    }
}