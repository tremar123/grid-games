document.addEventListener("DOMContentLoaded", () => {

    //cards array
    const cardsArray = [
        {
            name: "a",
            img: "/static/memory-game/images/a.svg"
        },
        {
            name: "a",
            img: "/static/memory-game/images/a.svg"
        },
        {
            name: "body",
            img: "/static/memory-game/images/body.svg"
        },
        {
            name: "body",
            img: "/static/memory-game/images/body.svg"
        },
        {
            name: "button",
            img: "/static/memory-game/images/button.svg"
        },
        {
            name: "button",
            img: "/static/memory-game/images/button.svg"
        },
        {
            name: "div",
            img: "/static/memory-game/images/div.svg"
        },
        {
            name: "div",
            img: "/static/memory-game/images/div.svg"
        },
        {
            name: "form",
            img: "/static/memory-game/images/form.svg"
        },
        {
            name: "form",
            img: "/static/memory-game/images/form.svg"
        },
        {
            name: "h1",
            img: "/static/memory-game/images/h1.svg"
        },
        {
            name: "h1",
            img: "/static/memory-game/images/h1.svg"
        },
        {
            name: "head",
            img: "/static/memory-game/images/head.svg"
        },
        {
            name: "head",
            img: "/static/memory-game/images/head.svg"
        },
        {
            name: "html",
            img: "/static/memory-game/images/html.svg"
        },
        {
            name: "html",
            img: "/static/memory-game/images/html.svg"
        },
        {
            name: "nav",
            img: "/static/memory-game/images/nav.svg"
        },
        {
            name: "nav",
            img: "/static/memory-game/images/nav.svg"
        },
    ]

    cardsArray.sort(() => 0.5 - Math.random());
    
    const grid = document.querySelector(".grid");
    const resultDisplay = document.querySelector("#result");
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsFound = [];

    //create board
    function createBoard() {
        for (let i = 0; i < cardsArray.length; i++) {
            var card = document.createElement("img");
            card.classList.add("cards")
            card.setAttribute("src", "/static/memory-game/images/blank.svg");
            card.setAttribute("data-id", i);
            card.addEventListener("click", flipCard);
            grid.appendChild(card);
        }
    }

    //check for matches
    function checkForMatch() {
        const cards = document.querySelectorAll(".cards");
        const firstId = cardsChosenId[0];
        const secondId = cardsChosenId[1];

        if (cardsChosen[0] === cardsChosen[1]) {
            cardsFound.push(cardsChosen);
        } else {
            cards[firstId].setAttribute("src", "/static/memory-game/images/blank.svg");
            cards[secondId].setAttribute("src", "/static/memory-game/images/blank.svg");
        }

        cardsChosen = [];
        cardsChosenId = [];
        resultDisplay.textContent = cardsFound.lenght;
        
        if (cardsFound.lenght === cardsArray.lenght/2) {
            alert("you won!")
            resultDisplay.textContent = "You won!";
        }
    }

    //flip card
    function flipCard() {
        let cardId = this.getAttribute("data-id");
        cardsChosen.push(cardsArray[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute("src", cardsArray[cardId].img);
        if (cardsChosen.length ===2) {
            setTimeout(checkForMatch, 500);
        }
    }

window.onload = createBoard;
    
})