//varables and stuff
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var randomfoodx = Math.ceil(Math.random() * 28) * 10;
var randomfoody = Math.ceil(Math.random() * 28) * 10;
var randomenemyX = Math.ceil(Math.random() * 28) * 10;
var randomenemyY = Math.ceil(Math.random() * 28) * 10;
var randomenemyA = Math.ceil(Math.random() * 28) * 10;
var randomenemyB = Math.ceil(Math.random() * 28) * 10;
var score = 0;
var counter = 500;
let game_mode = "single_player";
let player = "green";
const eat = new Audio();
const dead = new Audio();
const move = new Audio();
eat.src = "./sounds/soundEffect/food.ogg";
dead.src = "./sounds/soundEffect/dead.ogg";
move.src = "./sounds/soundEffect/move.ogg";
// consoles
console.log(randomfoodx);
console.log(`y ${randomfoody}`);
// GAME SOUNDS
function food() {
  ctx.fillStyle = "crimson";
  ctx.fillRect(randomfoodx, randomfoody, 10, 10);

  ctx.strokeStyle = "black";
  ctx.strokeRect(randomfoodx, randomfoody, 10, 10);
}
let green_snake = [{ x: 0, y: 0 }];
let white_snake = [{ x: 0, y: 0 }];
let blue_snake = [{ x: 0, y: 0 }];

let green_snake_x = (green_snake[0].x = 50),
  green_snake_y = (green_snake[0].y = 50),
  white_snake_x = (white_snake[0].x = 100),
  white_snake_y = (white_snake[0].y = 100),
  blue_snake_x = (blue_snake[0].x = 200),
  blue_snake_y = (blue_snake[0].y = 200);

function drawsnake() {
  for (let i = 0; i < green_snake.length; i++) {
    ctx.fillStyle = "lightgreen ";
    ctx.fillRect(green_snake[i].x, green_snake[i].y, 10, 10);

    ctx.strokeStyle = "black ";
    ctx.strokeRect(green_snake[i].x, green_snake[i].y, 10, 10);
  }

  for (let i = 0; i < white_snake.length; i++) {
    ctx.fillStyle = "grey ";
    ctx.fillRect(white_snake[i].x, white_snake[i].y, 10, 10);

    ctx.strokeStyle = "black ";
    ctx.strokeRect(white_snake[i].x, white_snake[i].y, 10, 10);
  }

  for (let i = 0; i < blue_snake.length; i++) {
    ctx.fillStyle = "lightblue ";
    ctx.fillRect(blue_snake[i].x, blue_snake[i].y, 10, 10);

    ctx.strokeStyle = "black ";
    ctx.strokeRect(blue_snake[i].x, blue_snake[i].y, 10, 10);
  }

  ctx.fillStyle = "green";
  ctx.fillRect(green_snake_x, green_snake_y, 10, 10);

  ctx.strokeStyle = "black";
  ctx.strokeRect(green_snake_x, green_snake_y, 10, 10);

  ctx.fillStyle = "white";
  ctx.fillRect(white_snake_x, white_snake_y, 10, 10);

  ctx.strokeStyle = "black";
  ctx.strokeRect(white_snake_x, white_snake_y, 10, 10);

  ctx.fillStyle = "blue";
  ctx.fillRect(blue_snake_x, blue_snake_y, 10, 10);

  ctx.strokeStyle = "black";
  ctx.strokeRect(blue_snake_x, blue_snake_y, 10, 10);
}

function current_snake_pos() {
  if (player === "green") {
    return { x: green_snake_x, y: green_snake_y };
  } else if (player === "white") {
    return { x: white_snake_x, y: white_snake_y };
  } else if (player === "blue") {
    return { x: blue_snake_x, y: blue_snake_y };
  }
}

function hitdetect({ snake_x, snake_y }) {
  if (
    (randomenemyA == snake_x && randomenemyB == snake_y) ||
    (randomenemyB == snake_x && randomenemyA == snake_y) ||
    (randomenemyX == snake_x && randomenemyY == snake_y) ||
    (randomenemyY == snake_x && randomenemyX == snake_y) ||
    (randomenemyX == snake_x && randomenemyA == snake_y) ||
    (randomenemyA == snake_x && randomenemyX == snake_y) ||
    (randomenemyY == snake_x && randomenemyA == snake_y) ||
    (randomenemyA == snake_x && randomenemyY == snake_y) ||
    (randomenemyY == snake_x && randomenemyB == snake_y) ||
    (randomenemyX == snake_x && randomenemyB == snake_y) ||
    (randomenemyB == snake_x && randomenemyY == snake_y) ||
    (randomenemyA == snake_x && randomenemyA == snake_y) ||
    (randomenemyB == snake_x && randomenemyB == snake_y) ||
    (randomenemyX == snake_x && randomenemyX == snake_y) ||
    (randomenemyY == snake_x && randomenemyY == snake_y)
  ) {
    return true;
  }
}

function enemydetect() {
  let pos_of_current_snake = current_snake_pos();
  if (hitdetect(pos_of_current_snake)) {
    dead.play();
    console.log("hit");
    gameover();
  }
}

function drawenemy(a, b, x, y) {
  ctx.fillStyle = "rgb(100,200,100)";
  ctx.fillRect(a, a, 10, 10);

  ctx.fillStyle = "rgb(200,200,100)";
  ctx.fillRect(b, b, 10, 10);

  ctx.fillStyle = "rgb(100,200,200)";
  ctx.fillRect(x, x, 10, 10);

  ctx.fillStyle = "rgb(10,200,10)";
  ctx.fillRect(y, y, 10, 10);

  ctx.fillStyle = "rgb(120,10,100)";
  ctx.fillRect(a, b, 10, 10);

  ctx.fillStyle = "rgb(100,100,115)";
  ctx.fillRect(b, a, 10, 10);

  ctx.fillStyle = "rgb(100,120,100)";
  ctx.fillRect(x, y, 10, 10);

  ctx.fillStyle = "rgb(100,110,100)";
  ctx.fillRect(y, x, 10, 10);

  ctx.fillStyle = "rgb(110,100,100)";
  ctx.fillRect(x, a, 10, 10);

  ctx.fillStyle = "rgb(100,120,100)";
  ctx.fillRect(x, b, 10, 10);

  ctx.fillStyle = "rgb(100,130,100)";
  ctx.fillRect(y, a, 10, 10);

  ctx.fillStyle = "rgb(170,100,100)";
  ctx.fillRect(y, b, 10, 10);

  ctx.fillStyle = "rgb(100,120,100)";
  ctx.fillRect(b, y, 10, 10);

  ctx.fillStyle = "rgb(130,120,100)";
  ctx.fillRect(a, y, 10, 10);

  ctx.fillStyle = "rgb(190,100,190)";
  ctx.fillRect(a, x, 10, 10);
}
var newhead;
function newtail() {
  let { a, b } = { green_snake_x, green_snake_y };

  if (a == randomfoodx && b == randomfoody) {
    randomfoodx = Math.ceil(Math.random() * 25) * 10;
    randomfoody = Math.ceil(Math.random() * 25) * 10;
    randomenemyX = Math.ceil(Math.random() * 28) * 10;
    randomenemyY = Math.ceil(Math.random() * 28) * 10;
    randomenemyA = Math.ceil(Math.random() * 28) * 10;
    randomenemyB = Math.ceil(Math.random() * 28) * 10;

    if (score > 100) {
      counter = 400;
    }
    if (
      score == 90 ||
      score == 490 ||
      score == 990 ||
      score == 190 ||
      score == 1490
    ) {
      move.play();
    } else {
      eat.play();
    }
    if (score > 200) {
      counter = 350;
    }
    if (score > 500) {
      counter = 250;
    }
    if (score < 100) {
      counter = 500;
    }
    console.log("success");
    score += 10;
    // GROWING PART OF SNAKE
    grow();
  } else {
    newhead = {
      x: green_snake_x,
      y: green_snake_y,
    };
    green_snake.pop();
    green_snake.unshift(newhead);
  }
}

function grow() {
  var newhead = {
    x: green_snake_x,
    y: green_snake_y,
  };
  green_snake.unshift(newhead);
}
function hitdetect() {
  if (green_snake_x < 0 || green_snake_x > 299) {
    dead.play();
    gameover();
  }
  if (green_snake_y < 0 || green_snake_y > 299) {
    dead.play();
    gameover();
  }
}

function gameover() {
  if (game_mode === "single_player") {
    restart();
  } else if (game_mode === "multi_player") {
    if (score >= -1000) {
      console.log(score);
      score -= 1;
    } else {
      console.log(score);
      restart();
    }
  }
}
function restart() {
  let popup = document.querySelector("#popup");
  let gif = document.querySelector(".gif");
  popup.style.display = "flex";
  gif.style.display = "inline";
  popup.innerText = `GAME OVER! Press R OR Double Click To Restart`;
  document.addEventListener("keydown", (e) => {
    if (e.key === "r" || e.key === "R") {
      game_restart();
    }
  });
  document.addEventListener("dblclick", () => game_restart());
  function game_restart() {
    gif.style.display = "none";
    popup.style.display = "none";
    counter = 500;
    score = 0;
    green_snake = [{ x: 0, y: 0 }];
    randomfoodx = Math.ceil(Math.random() * 25) * 10;
    randomfoody = Math.ceil(Math.random() * 25) * 10;
    randomenemyX = Math.ceil(Math.random() * 28) * 10;
    randomenemyY = Math.ceil(Math.random() * 28) * 10;
    randomenemyA = Math.ceil(Math.random() * 28) * 10;
    randomenemyB = Math.ceil(Math.random() * 28) * 10;
  }
}

function move_snake(player, move) {
  if (player == "green") {
    switch (move) {
      case "up":
        green_snake_y += 10;
        break;
      case "down":
        green_snake_y -= 10;
        break;
      case "right":
        green_snake_x += 10;
        break;
      case "left":
        green_snake_x -= 10;
    }
  }

  if (player == "red") {
    switch (move) {
      case "up":
        red_snake_y += 10;
        break;
      case "down":
        red_snake_y -= 10;
        break;
      case "right":
        red_snake_x += 10;
        break;
      case "left":
        red_snake_x -= 10;
    }
  }

  if (player == "blue") {
    switch (move) {
      case "up":
        blue_snake_y += 10;
        break;
      case "down":
        blue_snake_y -= 10;
        break;
      case "right":
        blue_snake_x += 10;
        break;
      case "left":
        blue_snake_x -= 10;
    }
  }

  send_snake_pos([]);
}
// keys
document.addEventListener("keydown", keydown);

function keydown(e) {
  switch (e.key) {
    case "w":
      move_snake(player, "up");
      break;
    case "s":
      move_snake(player, "down");
      break;
    case "d":
      move_snake(player, "right");
      break;
    case "a":
      move_snake(player, "left");
      break;
  }
}
// button

function move_snake_btn(btn) {
  switch (btn) {
    case "up":
      move_snake(player, "up");
      break;
    case "down":
      move_snake(player, "down");
      break;
    case "right":
      move_snake(player, "right");
      break;
    case "left":
      move_snake(player, "left");
      break;
  }
}
//update start
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  food();
  enemydetect();
  drawenemy(randomenemyA, randomenemyB, randomenemyX, randomenemyY);

  ctx.fillStyle = "crimson";
  ctx.font = "20px 'Bangers'";
  ctx.fillText("SCORE : " + score, 10, 20);
  // counter
  if (counter > 0) {
    counter--;
  }
  ctx.fillStyle = "crimson";
  ctx.font = "20px 'Bangers'";
  ctx.fillText("TIME : " + counter, 220, 20);

  if (counter == 0) {
    gameover();
  }
  drawsnake();
  newtail();
  hitdetect();
  requestAnimationFrame(update);
}

update();
