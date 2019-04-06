/*
 * Create a list that holds all of your cards
 */

let card = document.getElementsByClassName("card");

let cards  = [...card];

const deck = document.querySelector('.deck');
// conut move
let   moves= 0;
let counter = document.querySelector(".moves");
// declare variables for star icons
const stars = document.querySelectorAll(".fa-star");
// declare variables for the card were are match
let caredmatch = document.getElementsByClassName("match");
// declare variable for astars list
let starsAll = document.querySelectorAll(".stars li");
// close icon in modal
 let closeicon = document.querySelector(".close");
 // declare modal
 let modal = document.getElementById("final");

 let openCards = [];


// function generateCard(card) {
//   return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
// }
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
document.body.onload = startGame();


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


function startGame(){

  // shuffle the cards for each time
   cards  = shuffle(cards);
   setTimeout(function() {

   for (var i = 0; i < cards.length; i++){
     deck.innerHTML = "";
     [].forEach.call(cards, function(item) {
         deck.appendChild(item);
     });
   cards[i].classList.remove("show", "open", "match", "disabled");}
 },1700);
   // remove all exisiting classes from each card
   for (var i = 0; i < cards.length; i++){
       deck.innerHTML = "";
       [].forEach.call(cards, function(item) {
           deck.appendChild(item);
       });
       cards[i].classList.add("show", "open", "match", "disabled");
   }
   // clear the moves and set it to 0
   moves = 0;
   counter.innerHTML = moves;
   // clear the stars and set it to 3
   for (var i= 0; i < stars.length; i++){
       stars[i].style.color = "#FFD700";
       stars[i].style.visibility = "visible";
   }
   // clear the timer and set it to 0:0:0
   second = 0;
   minute = 0;
   hour = 0;
   var timer = document.querySelector(".timer");
   timer.innerHTML = "0 mins 0 secs";
   clearInterval(interval);
}

var displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};
function open(){
  openCards.push(this);
    let len = openCards.length;
    if(len === 2){
        moveCounter1();
        if(openCards[0].type === openCards[1].type){
            matched();
        } else {
            unmatched();
        }
    }
};
function matched(){
  openCards[0].classList.add('match', 'disabled',);
  openCards[1].classList.add('match', 'disabled',);

  openCards[0].classList.remove('open','show','no-event');
  openCards[1].classList.remove('open','show','no-event');

  openCards = [];
}

function seeCard(){}

function unmatched(){
  openCards[0].classList.add("unmatched");
   openCards[1].classList.add("unmatched");
  disable();
  setTimeout(function() {
    openCards[0].classList.remove("show", "open", "no-event","unmatched");
     openCards[1].classList.remove("show", "open", "no-event","unmatched");
      enable();
    openCards = [];
  }, 1100);
}

function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}

function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < caredmatch.length; i++){
            caredmatch[i].classList.add("disabled");
        }
    });
}
//  count player's moves
function moveCounter1(){
    moves++;
    counter.innerHTML = moves;
    //start timer on first click
    if(moves == 1){
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }
    // setting rates based on moves
    if (moves > 7 && moves < 11){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 13){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}


//  game timer
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },999);
}


// the end of game  when all cards match, show modal and moves, time and rating
function end(){
    if (caredmatch.length == 16){
        clearInterval(interval);
        finalTime = timer.innerHTML;

        // show congratulations modal
        modal.classList.add("show");

        // declare star rating variable
        var starRating = document.querySelector(".stars").innerHTML;

        //showing move, rating, time on modal
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;

        //closeicon on modal
        closeModal();
    };
}

// close icon on modal
function closeModal(){
    closeicon.addEventListener("click", function(e){
        modal.classList.remove("show");
        startGame();
    });
}


// for user to play Again
function playAgain(){
    modal.classList.remove("show");
    startGame();
}
//
//
// // loop to add event listeners to each card
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", open);
    card.addEventListener("click",end);
};
