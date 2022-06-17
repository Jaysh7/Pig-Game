"use strict";

//selecting elements
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

const diceEl = document.querySelector(".dice");
const btnroll = document.querySelector(".btn--roll");
const btnnew = document.querySelector(".btn--new");
const btnhold = document.querySelector(".btn--hold");

//adding conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

let playing = true;
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  // tooggle
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//User rolls dice
const rollDice = function () {
  if (playing) {
    //1. Genrate the dice number
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. Display the dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    //3. Check the dice roll
    if (dice !== 1) {
      //add dice to current score
      currentScore = currentScore + dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
      console.log(currentScore);
      //3. else swtich the player
    } else {
      switchPlayer();
    }
  }
};
//User holds the score
const diceHold = function () {
  if (playing) {
    scores[activePlayer] = currentScore + scores[activePlayer];
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    //1 . check the maximum score.
    if (scores[activePlayer] >= 10) {
      playing = false;
      diceEl.classList.add("hidden");
      //finish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //3. swtch player.
      switchPlayer();
    }
  }
};
//newgame functionality
const newGame = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
newGame();

btnnew.addEventListener("click", newGame);
btnroll.addEventListener("click", rollDice);
btnhold.addEventListener("click", diceHold);
