const cards = document.querySelectorAll('.cards');
let timer = document.getElementById("timer");
let moves = document.getElementById("move");

let flippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

//Timer
let second = 0;
let split_second = 0;
let interval = undefined;
let movesCount = 0;


function flipCard() {
    if(lockBoard == false) {
        this.classList.add('flip');
        
        if (interval === undefined) {
            interval = setInterval(updateTimer, 10);
        }
        incrementMovesCounter();

  
        if(!flippedCard){
            flippedCard = true;
            firstCard = this;
            
        } else {
            flippedCard = false;
            secondCard = this;
            Match();
            
        }
    }
}


    


function Match() {
    //Match Situation
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        
    } else {
        //I set the timeout to see the other card
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            firstCard.classList.add("fliped");

            lockBoard = false;
        }, 1500)
        
    }
}

(function Shuffle() {
    cards.forEach(card => {
        let rand = Math.floor(Math.random() * 12);
        card.style.order = rand;
    })
})();



function updateTimer() {
    if (firstCard.classList.contains("matched") || firstCard.classList.contains("fliped") || firstCard.classList.contains("flip")) {
        split_second++;

        if (split_second === 100) {
            split_second = 0;
            second++;
        }

        const fSn = f(second);
        const fSl = f(split_second);

        timer.innerHTML = `<strong>${fSn}:${fSl}</strong>`;

        checkMatchedCardsCount();
    }
}
function checkMatchedCardsCount() {
    const matchedCards = document.querySelectorAll(".matched");
    if (matchedCards.length === 10) {
        clearInterval(interval);
    }
}
function f(time) {
    return time.toString().padStart(2, '0');
}



//For calculating moves

function incrementMovesCounter() {
   movesCount += 1;
    moves.innerHTML = `Moves: ${movesCount}`;
}

cards.forEach(card => card.addEventListener('click', flipCard));