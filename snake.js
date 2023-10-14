let foodX = 10;
let foodY = 15;

let snakeX = 6;
let snakeY = 15;

let velocityX = 0;
let velocityY = 0;
let score = 0;
let intervalId;
let snakeBody = [];

// DOM
const gameBoard = document.querySelector(".game-board");
const scoreBoard = document.querySelector(".score");

function gameOver() {
  velocityY = 0;
  velocityX = 0;
  snakeX = 6;
  snakeY = 15;
  foodX = 10;
  foodY = 15;
  alert("Game Over");
  clearInterval(intervalId);
  location.reload();
}

function startGame() {
  snakeX += velocityX;
  snakeY += velocityY;
  snakeBody[0] = [snakeX, snakeY];

  for (let i = 1; i < snakeBody.length; i++) {
    if (
      snakeBody[0][1] === snakeBody[i][1] &&
      snakeBody[0][0] === snakeBody[i][0]
    ) {
      return gameOver();
    }
  }

  if (snakeX === foodX && snakeY === foodY) {
    changeFoodPosition();
    score += 1;
    snakeBody.push([foodX, foodY]);
  }
  scoreBoard.innerHTML = `Score: ${score}`;

  if (snakeX < 0 || snakeY < 0 || snakeX > 30 || snakeY > 30) {
    return gameOver();
  }

  let foodHTML = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
  gameBoard.innerHTML = foodHTML;
  //   string concatenation

  for (let i = snakeBody.length - 1; i > 0; i -= 1) {
    snakeBody[i] = snakeBody[i - 1];
  }

  for (let i = 0; i < snakeBody.length; i += 1) {
    let snakeHTML = `<div class="snake" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    gameBoard.innerHTML += snakeHTML;
  }
}

function changeFoodPosition() {
  foodX = Math.floor(Math.random() * 30 + 1);
  foodY = Math.floor(Math.random() * 30 + 1);
}

function changeSnakePosition(event) {
  // conditions
  if (event.key === "ArrowRight") {
    velocityY = 0;
    velocityX = 1;
  } else if (event.key === "ArrowLeft") {
    velocityY = 0;
    velocityX = -1;
  } else if (event.key === "ArrowUp") {
    velocityY = -1;
    velocityX = 0;
  } else if (event.key === "ArrowDown") {
    velocityY = 1;
    velocityX = 0;
  }
  startGame();
}

window.addEventListener("keydown", changeSnakePosition);

changeFoodPosition();
intervalId = setInterval(startGame, 150);
