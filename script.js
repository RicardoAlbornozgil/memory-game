function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

function createDivsForColors(colorArray) {
  const gameContainer = document.getElementById("game");
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    setTimeout(() => {
      newDiv.addEventListener("click", handleCardClick);
    }, 3000)
    gameContainer.append(newDiv);
  }
}

function startGame() {
  score = 0;
  attempts = 5;
  document.getElementById("score").innerText = score;
  document.getElementById("attempts").innerText = attempts;
  switchButton();
  resetBoard();
  createDivsForColors(shuffle(COLORS));
  // Show all cards then hide them
  displayCards();
}

function displayCards() {
  const divs = document.querySelectorAll(`#game div`);
  for (let div of divs) {
    div.style.backgroundColor = div.classList[0];
    setTimeout(() => {
      div.style.backgroundColor = ``;
    }, 3000);
  }
}


function switchButton() {
  const startButton = document.getElementById("start-game");
  
  // Replace start button with restart button
  startButton.removeEventListener("click", startGame);
  startButton.addEventListener("click", restartGame);
  startButton.innerText = "Restart Game";

  // Add exit button
  const exitButton = document.createElement("button");
  exitButton.addEventListener("click", exitGame);
  exitButton.innerText = "Exit Game";
  startButton.parentNode.appendChild(exitButton);
}

function exitGame() {
  alert("Exiting game");
  location.reload();
}

function restartGame() {
  score = 0;
  attempts = 5;
  document.getElementById("score").innerText = score;
  document.getElementById("attempts").innerText = attempts;
  resetBoard();
  
  // Remove existing cards
  let gameDiv = document.getElementById("game");
  while (gameDiv.firstChild) {
    gameDiv.removeChild(gameDiv.firstChild);
  }

  // Create new cards
  createDivsForColors(shuffle(COLORS));

  // Show all cards then hide them
  displayCards();
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  hasFlippedCard = false;
  lockBoard = false;
}

function handleCardClick(event) {
  if (lockBoard) return;
  if (event.target === firstCard) return;

  event.target.style.backgroundColor = event.target.classList[0];

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = event.target;
  } else {
    secondCard = event.target;
    checkForMatch();
  }
}

function checkForMatch() {
  let isMatch = firstCard.classList[0] === secondCard.classList[0];

  // If cards match it will disable them from working again. Otherwise an attempt is lost.
  if (isMatch) {
    disableCards();
  } else {
    unflipCards();
    attempts--;
    document.getElementById("attempts").innerText = attempts
  }
  
  document.getElementById("score").innerText = score;

  if (score === COLORS.length / 2) {
    setTimeout( () => {
      alert("Congratulations! You won!");
    }, 1000);
    // TODO: Check and update local storage for the lowest-scoring game
  }
  if (attempts <= 0) {
    setTimeout( () => {
      alert("You have lost! Game Over.")
    }, 1000);
  }
}

function disableCards() {
  firstCard.removeEventListener("click", handleCardClick);
  secondCard.removeEventListener("click", handleCardClick);
  score++;
  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.style.backgroundColor = "";
    secondCard.style.backgroundColor = "";
    resetBoard();
  }, 1000);
}


let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = false;
let score = 0;
let attempts = 5;

let startButton = document.querySelector("#start-game");
startButton.addEventListener("click", startGame);


const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

