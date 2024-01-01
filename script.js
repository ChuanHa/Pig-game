'use strict';

let rollDice = () => Math.floor(Math.random() * 6) + 1;

const diceImg = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const player0Active = document.querySelector('.player--0');
const player1Active = document.querySelector('.player--1');
const currentScore0 = document.querySelector('#current--0');
const currentScore1 = document.querySelector('#current--1');
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');

let scores, currentScore, activePlayer;

// Starting conditions
const init = function () {
  // Array to hold both score of player 0 and 1
  scores = [0, 0];
  // Set the current active player to player 0
  currentScore = 0;
  activePlayer = 0;

  score0.textContent = 0;
  score1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  // Hide the current dice image for new game
  diceImg.classList.add('hidden');
  player0Active.classList.remove('player--winner');
  player1Active.classList.remove('player--winner');
  player0Active.classList.add('player--active');
  player1Active.classList.remove('player--active');
  btnRoll.disabled = false;
  btnHold.disabled = false;
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  // Toggle add the class to the element if the added class not existed, similar to add()
  // Toggle also remove the class if it existed, similar to remove ()
  // NOTE: Toggle only need className without using .
  player0Active.classList.toggle('player--active');
  player1Active.classList.toggle('player--active');
};

// User click roll dice button
btnRoll.addEventListener('click', function () {
  // Call rollDice function to generate random dice number
  let curDice = rollDice();
  console.log(curDice);
  // Remove hidden class to display dice image
  diceImg.classList.remove('hidden');
  diceImg.src = `dice-${curDice}.png`;
  if (curDice != 1) {
    // Add dice score to current score
    currentScore += curDice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    // Switch to next player, check if current player is 0 or 1
    switchPlayer();
  }
});

// User click hold button to hold the current score and add to the player score
btnHold.addEventListener('click', function () {
  // Check for current player, and append current score to score array
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  // Check to see if player won the game with score >= 100
  if (scores[activePlayer] >= 20) {
    // NOTE: select class by using querySelector need .className
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    // Disable roll and hold button when player win, hide dice image
    btnRoll.disabled = true;
    btnHold.disabled = true;
    diceImg.classList.toggle('hidden');
  } else {
    switchPlayer();
  }
});

// Reset game state when new game button is pressed
btnNew.addEventListener('click', init);
