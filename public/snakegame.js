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
let game_mode = "multi_player";
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
let snakehead = [{ x: 0, y: 0 }];
var SNAKEx = (snakehead[0].x = 200);
var SNAKEy = (snakehead[0].y = 200);
function drawsnake() {
  for (let i = 0; i < snakehead.length; i++) {
    ctx.fillStyle = "lightgreen ";
    ctx.fillRect(snakehead[i].x, snakehead[i].y, 10, 10);

    ctx.strokeStyle = "black ";
    ctx.strokeRect(snakehead[i].x, snakehead[i].y, 10, 10);
  }
  ctx.fillStyle = "green";
  ctx.fillRect(SNAKEx, SNAKEy, 10, 10);

  ctx.strokeStyle = "black";
  ctx.strokeRect(SNAKEx, SNAKEy, 10, 10);
}
function enemydetect() {
  if (
    (randomenemyA == SNAKEx && randomenemyB == SNAKEy) ||
    (randomenemyB == SNAKEx && randomenemyA == SNAKEy) ||
    (randomenemyX == SNAKEx && randomenemyY == SNAKEy) ||
    (randomenemyY == SNAKEx && randomenemyX == SNAKEy) ||
    (randomenemyX == SNAKEx && randomenemyA == SNAKEy) ||
    (randomenemyA == SNAKEx && randomenemyX == SNAKEy) ||
    (randomenemyY == SNAKEx && randomenemyA == SNAKEy) ||
    (randomenemyA == SNAKEx && randomenemyY == SNAKEy) ||
    (randomenemyY == SNAKEx && randomenemyB == SNAKEy) ||
    (randomenemyX == SNAKEx && randomenemyB == SNAKEy) ||
    (randomenemyB == SNAKEx && randomenemyY == SNAKEy) ||
    (randomenemyA == SNAKEx && randomenemyA == SNAKEy) ||
    (randomenemyB == SNAKEx && randomenemyB == SNAKEy) ||
    (randomenemyX == SNAKEx && randomenemyX == SNAKEy) ||
    (randomenemyY == SNAKEx && randomenemyY == SNAKEy)
  ) {
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
  var a = SNAKEx;
  var b = SNAKEy;
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
      x: SNAKEx,
      y: SNAKEy,
    };
    snakehead.pop();
    snakehead.unshift(newhead);
  }
}
function grow() {
  var newhead = {
    x: SNAKEx,
    y: SNAKEy,
  };
  snakehead.unshift(newhead);
}
function hitdetect() {
  if (SNAKEx < 0 || SNAKEx > 299) {
    dead.play();
    gameover();
  }
  if (SNAKEy < 0 || SNAKEy > 299) {
    dead.play();
    gameover();
  }
}

function gameover() {
  if (game_mode === "single_player") {
  } else if (game_mode === "multi_player") {
    if (score >= -1000) {
      score -= 1;
    } else {
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
    snakehead = [{ x: 0, y: 0 }];
    randomfoodx = Math.ceil(Math.random() * 25) * 10;
    randomfoody = Math.ceil(Math.random() * 25) * 10;
    randomenemyX = Math.ceil(Math.random() * 28) * 10;
    randomenemyY = Math.ceil(Math.random() * 28) * 10;
    randomenemyA = Math.ceil(Math.random() * 28) * 10;
    randomenemyB = Math.ceil(Math.random() * 28) * 10;
  }
}
// keys
document.addEventListener("keydown", keydown);
function keydown(e) {
  if (e.key == "w") {
    SNAKEy += -10;
  }
  if (e.key == "s") {
    SNAKEy += 10;
  }
  if (e.key == "a") {
    SNAKEx += -10;
  }
  if (e.key == "d") {
    SNAKEx += 10;
  }
  if (e.key == "d" || e.key == "w" || e.key == "a" || e.key == "s") {
    send_snake_pos([SNAKEx, SNAKEy]);
  }
}
// button
function buttonup() {
  SNAKEy += -10;
}
function buttondown() {
  SNAKEy += 10;
}
function buttonr() {
  SNAKEx += 10;
}
function buttonl() {
  SNAKEx += -10;
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
