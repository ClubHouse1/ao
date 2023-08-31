const globe = document.getElementById('globe');
const drawButton = document.getElementById('drawButton');
const totalBallsInput = document.getElementById('totalBalls');
const ballsToDrawInput = document.getElementById('ballsToDraw');
const resultContainer = document.getElementById('resultContainer');

let totalBalls = parseInt(totalBallsInput.value);
let ballsToDraw = parseInt(ballsToDrawInput.value);
let allBalls = [];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function updateGlobeSize() {
  const ballSize = 30;
  const columns = Math.ceil(Math.sqrt(totalBalls));
  const rows = Math.ceil(totalBalls / columns);
  const globeWidth = columns * ballSize + (columns - 1) * 10;
  const globeHeight = rows * ballSize + (rows - 1) * 10;
  globe.style.width = `${globeWidth}px`;
  globe.style.height = `${globeHeight}px`;
}

function updateBalls() {
  allBalls = [];
  globe.innerHTML = '';

  updateGlobeSize();

  for (let i = 1; i <= totalBalls; i++) {
    const ball = document.createElement('div');
    ball.className = 'ball';
    ball.textContent = i;
    ball.style.backgroundColor = `rgb(${getRandomInt(256)}, ${getRandomInt(256)}, ${getRandomInt(256)})`;
    allBalls.push(ball);
    globe.appendChild(ball);
  }
}

function drawBalls() {
  if (allBalls.length >= ballsToDraw) {
    resultContainer.innerHTML = '';
    const drawnBalls = [];
    for (let i = 0; i < ballsToDraw; i++) {
      const randomIndex = getRandomInt(allBalls.length);
      const selectedBall = allBalls.splice(randomIndex, 1)[0];
      resultContainer.appendChild(selectedBall.cloneNode(true));
      drawnBalls.push(selectedBall);
    }
    updateGlobeSize();
    resultContainer.style.display = 'flex';
    resultContainer.style.flexDirection = 'row';
  } else {
    resultContainer.innerHTML = 'Not enough balls to draw.';
  }
}

drawButton.addEventListener('click', () => {
  drawBalls();
});

totalBallsInput.addEventListener('input', () => {
  totalBalls = parseInt(totalBallsInput.value);
  updateBalls();
  moveBalls();
});

ballsToDrawInput.addEventListener('input', () => {
  ballsToDraw = parseInt(ballsToDrawInput.value);
});

updateBalls();
