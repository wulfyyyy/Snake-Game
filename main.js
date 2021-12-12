const grid = document.querySelector(".grid");

const startBtn = document.querySelector("#start");
const scoreDisplay = document.getElementById("score");

let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
let width = 10;
let appleIndex = 0;
let score = 0;
let intervalTime = 1000;
let timerId = 0;

function createGrid() {
  for (let i = 0; i < 100; i++) {
    // create elements
    const square = document.createElement("div");
    // .appendChild adds the div "square" into the grid element. Grid is parent child is square.
    square.classList.add("square");
    grid.appendChild(square);

    squares.push(square);
  }
}

createGrid();

currentSnake.forEach((index) => squares[index].classList.add("snake"));
function startGame() {
  currentSnake.forEach((index) => squares[index].classList.remove("snake"));
  squares[appleIndex].classList.remove("apple");
  clearInterval(timerId);
  timerId = setInterval(move, intervalTime);
  direction = 1;
  score = 0;
  scoreDisplay.textContent = score;
  currentSnake = [2, 1, 0];
  currentSnake.forEach((index) => squares[index].classList.add("snake"));
  intervalTime = 1000;
  generateApples();

  timerId = setInterval(move, intervalTime);
}
function move() {
  if (
    // if snake has hit bottom
    (currentSnake[0] + width >= 100 && direction === 10) ||
    // if snake has hit right wall
    (currentSnake[0] % width === 9 && direction === 1) ||
    // if snake his left wall
    (currentSnake[0] % width === 0 && direction === -1) ||
    // if snake has hit top wall
    (currentSnake[0] - width < 0 && direction == -10) ||
    squares[currentSnake[0] + direction].classList.contains("snake")
  )
    return clearInterval(timerId);

  //remove last element from the current snake array
  const tail = currentSnake.pop();
  // remove styling from last element
  squares[tail].classList.remove("snake");
  // add square in direction we are moving then style it
  currentSnake.unshift(currentSnake[0] + direction);
  squares[currentSnake[0]].classList.add("snake");
  // if statment for snake head getting to apple
  if (squares[currentSnake[0]].classList.contains("apple")) {
    // remove class of apple where snake head is
    squares[currentSnake[0]].classList.remove("apple");
    // grow or snake by adding class of snake to end of array
    squares[tail].classList.add("snake");
    currentSnake.push(tail);
    // generate new apple
    generateApples();

    score++;
    scoreDisplay.textContent = score;
    clearInterval(timerId);
    intervalTime = intervalTime * 0.8;
    timerId = setInterval(move, intervalTime);
  }
  squares[currentSnake[0]].classList.add("snake");
}

function generateApples() {
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains("snake"));
  squares[appleIndex].classList.add("apple");
}

generateApples();

function control(event) {
  if (event.keyCode === 39) {
    console.log("right pressed");
    direction = 1;
  } else if (event.keyCode === 38) {
    console.log("up pressed");
    direction = -width;
  } else if (event.keyCode === 37) {
    console.log("left pressed");
    direction = -1;
  } else if (event.keyCode === 40) {
    direction = +width;
    console.log("down pressed");
  }
}

document.addEventListener("keyup", control);
startBtn.addEventListener("click", startGame);
