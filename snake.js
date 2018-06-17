var GRID_SIZE = 50;
var GRID_PADDING = 8;

var canvas;
var context;
var n;
var m;

var player = [
  new Coord(0, 0),
  new Coord(0, 1)
];

var apple;

window.onload = function (ev) {
  canvas = $("#canvas")[0];
  context = canvas.getContext("2d");
  n = Math.floor(canvas.height / GRID_SIZE);
  m = Math.floor(canvas.width / GRID_SIZE);
  drawGrid();
  renderPlayer();
  generateApple();
  window.onkeydown = handleKeyDown;
};

function drawGrid() {
  for (var width = GRID_SIZE; width < canvas.width; width += GRID_SIZE) {
    context.moveTo(width, 0);
    context.lineTo(width, canvas.height);
    context.stroke();
  }
  for (var height = GRID_SIZE; height < canvas.height; height += GRID_SIZE) {
    context.moveTo(0, height);
    context.lineTo(canvas.width, height);
    context.stroke();
  }
}

function renderPlayer() {
  player.forEach(renderPlayerAt);
}

function renderPlayerAt(coord) {
  var coordX = coord.x * GRID_SIZE + GRID_PADDING;
  var coordY = coord.y * GRID_SIZE + GRID_PADDING;
  context.fillStyle = "red";
  context.fillRect(coordX, coordY, GRID_SIZE - 2 * GRID_PADDING, GRID_SIZE - 2 * GRID_PADDING);
}

function hidePlayerAt(x, y) {
  var coordX = x * GRID_SIZE + GRID_PADDING;
  var coordY = y * GRID_SIZE + GRID_PADDING;
  context.clearRect(coordX, coordY, GRID_SIZE - 2 * GRID_PADDING, GRID_SIZE - 2 * GRID_PADDING);
}

function renderApple() {
  var coordX = apple.x * GRID_SIZE + GRID_PADDING;
  var coordY = apple.y * GRID_SIZE + GRID_PADDING;
  context.fillStyle = "green";
  context.fillRect(coordX, coordY, GRID_SIZE - 2 * GRID_PADDING, GRID_SIZE - 2 * GRID_PADDING);
}

function moveLeft() {
  if (!canMoveLeft()) {
    return;
  }
  var newHead = player[0].left();
  if (!isApple(newHead)) {
    var tail = player.pop();
    hidePlayerAt(tail.x, tail.y);
  }
  player.unshift(newHead);
  if (isApple(newHead)) {
    generateApple();
  }
  renderPlayerAt(newHead);
}

function moveRight() {
  if (!canMoveRight()) {
    return;
  }
  var newHead = player[0].right();
  if (!isApple(newHead)) {
    var tail = player.pop();
    hidePlayerAt(tail.x, tail.y);
  }
  player.unshift(newHead);
  if (isApple(newHead)) {
    generateApple();
  }
  renderPlayerAt(newHead);
}

function moveUp() {
  if (!canMoveUp()) {
    return;
  }
  var newHead = player[0].up();
  if (!isApple(newHead)) {
    var tail = player.pop();
    hidePlayerAt(tail.x, tail.y);
  }
  player.unshift(newHead);
  if (isApple(newHead)) {
    generateApple();
  }
  renderPlayerAt(newHead);
}

function moveDown() {
  if (!canMoveDown()) {
    return;
  }
  var newHead = player[0].down();
  if (!isApple(newHead)) {
    var tail = player.pop();
    hidePlayerAt(tail.x, tail.y);
  }
  player.unshift(newHead);
  if (isApple(newHead)) {
    generateApple();
  }
  renderPlayerAt(newHead);
}

function canMoveLeft() {
  var head = player[0];
  if (head.x <= 0) {
    return false;
  }
  if (isPlayerAt(head.left())) {
    return false;
  }
  return true;
}

function canMoveRight() {
  var head = player[0];
  if (head.x >= m - 1) {
    return false;
  }
  if (isPlayerAt(head.right())) {
    return false;
  }
  return true;
}

function canMoveUp() {
  var head = player[0];
  if (head.y <= 0) {
    return false;
  }
  if (isPlayerAt(head.up())) {
    return false;
  }
  return true;
}

function canMoveDown() {
  var head = player[0];
  if (head.y >= n - 1) {
    return false;
  }
  if (isPlayerAt(head.down())) {
    return false;
  }
  return true;
}

function isPlayerAt(coord) {
  for (var i = 0; i < player.length; i++) {
    if (player[i].x === coord.x && player[i].y === coord.y) {
      return true;
    }
  }
  return false;
}

function isApple(coord) {
  return apple.x === coord.x && apple.y === coord.y;
}

function handleKeyDown(event) {
  if (event.keyCode === 37) {
    moveLeft();
  } else if (event.keyCode === 38) {
    moveUp();
  } else if (event.keyCode === 39) {
    moveRight();
  } else if (event.keyCode === 40) {
    moveDown();
  }
}

function generateApple() {
  var coord = {};
  do {
    coord.x = Math.floor(m * Math.random());
    coord.y = Math.floor(n * Math.random());
  } while (isPlayerAt(coord));
  apple = coord;
  renderApple();
}

function Coord(x, y) {
  this.x = x;
  this.y = y;
}

Coord.prototype.left = function () {
  return new Coord(this.x - 1, this.y);
};

Coord.prototype.right = function () {
  return new Coord(this.x + 1, this.y);
};

Coord.prototype.up = function () {
  return new Coord(this.x, this.y - 1);
};

Coord.prototype.down = function () {
  return new Coord(this.x, this.y + 1);
};
