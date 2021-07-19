// select a canvas

const cvs = document.getElementById("pong");
const ctx = cvs.getContext("2d");

let upArrowPressed =false;
let downArrowPressed =false;
//creating user paddle
const user = {
  x: 0,
  y: cvs.height / 2 - 100 / 2, //(100 is total size of user paddle)
  width: 10,
  height: 100,
  color: "WHITE",
  score: 0,
};
//creating computer paddle
const comp = {
  x: cvs.width - 10,
  y: cvs.height / 2 - 100 / 2, //(100 is total size of comp paddle)
  width: 10,
  height: 100,
  color: "WHITE",
  score: 0,
};
//create the ball
const ball = {
  x: cvs.width / 2,
  y: cvs.height / 2,
  radius: 10,
  speed: 5,
  velocityX: 5,
  velocityY: 5,
  color: "WHITE",
};

// create net
const net = {
  x: cvs.width / 2 - 1,
  y: 0,
  width: 2,
  height: 10,
  color: "WHITE",
};

//draw rect function
function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

//draw circle
function drawCircle(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.fill();
}

//draw text
function drawText(text, x, y, color) {
  ctx.fillStyle = color;
  ctx.font = "45px fantasy ";
  ctx.fillText(text, x, y);
}

// draw net
function drawNet() {
  for (let i = 0; i <= cvs.height; i += 15) {
    drawRect(net.x, net.y + i, net.width, net.height, net.color);
  }
}
window.addEventListener('keydown', keyDownHandler);
window.addEventListener('keyup', keyUpHandler);

// gets activated when we press down a key
function keyDownHandler(event) {
  // get the keyCode
  switch (event.keyCode) {
    // "up arrow" key
    case 38:
      // set upArrowPressed = true
      upArrowPressed = true;
      break;
    // "down arrow" key
    case 40:
      downArrowPressed = true;
      break;
  }
}

function keyUpHandler(event) {
  switch (event.keyCode) {
    // "up arraow" key
    case 38:
      upArrowPressed = false;
      break;
    // "down arrow" key
    case 40:
      downArrowPressed = false;
      break;
  }
}

//render function
function render() {
  //clear the canvas
  drawRect(0, 0, cvs.width, cvs.height, "BLACK");

  //draw net
  drawNet();

  //draw score
  drawText(user.score, cvs.width / 4, cvs.height / 5, "WHITE"); // (user score)
  drawText(comp.score, (3 * cvs.width) / 4, cvs.height / 5, "WHITE"); // (computer score )

  // drawing paddles
  drawRect(user.x, user.y, user.width, user.height, user.color); //user paddle
  drawRect(comp.x, comp.y, comp.width, comp.height, comp.color); //computer paddle

  //drawing ball
  drawCircle(ball.x, ball.y, ball.radius, ball.color);
}
// controlling user paddle
// cvs.addEventListener("mousemove", movePaddle);

// function movePaddle(evt) {
//   let rect = cvs.getBoundingClientRect();

//   user.y = evt.clientY - rect.top - user.height / 2;
// }

//collision detection
function collision(b, p) {
  //( b:ball,p : paddle )
  b.top = b.y - b.radius;
  b.bottom = b.y + b.radius;
  b.left = b.x - b.radius;
  b.right = b.x + b.radius;

  p.top = p.y;
  p.bottom = p.y + p.height;
  p.left = p.x;
  p.right = p.x + p.width;

  return (
    b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom
  );
}

//reset function
function resetBall() {
  ball.x = cvs.width / 2;
  ball.y = cvs.height / 2;
  ball.speed = 5;
  ball.velocityX = -ball.velocityX;
}

// update : position , movement , score ,etc....(core logic)
function update() {
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;

  //simple AI to control computer paddle
  let computerLevel = 0.5;
  comp.y += (ball.y - (comp.y + comp.height / 2)) * computerLevel;


// user up down change
  if (upArrowPressed && user.y > 0) {
    user.y -= 12;
  } else if (downArrowPressed && user.y < cvs.height - user.height) {
    user.y += 12;
  }

  if (ball.y + ball.radius > cvs.height || ball.y - ball.radius < 0) {
    //(  if ball hit upper or lower boundary , reverse y velocity    )
    ball.velocityY = -ball.velocityY;
  }

  let player = ball.x < cvs.width / 2 ? user : comp;
  if (collision(ball, player)) {
    // calculating and normalising where the ball hits the player
    let collidePoint = ball.y - (player.y + player.height / 2);
    collidePoint = collidePoint / (player.height / 2);

    // calculating angle in radian
    let angleRad = collidePoint + Math.PI / 4;

    //direction in which ball must go after collision
    let direction = ball.x < cvs.width / 2 ? 1 : -1;

    //change velocity x and y
    ball.velocityX = direction * ball.speed;

    ball.speed += 0.7; //increasing speed everytime ball hits the paddle
  }
  // update score
  if (ball.x - ball.radius < 0) {
    // comp win
    comp.score++;
    resetBall();
  } else if (ball.x + ball.radius > cvs.width) {
    // user win
    user.score++;
    resetBall();
  }
}

//game init
function game() {
  update();
  render();
}

//loop
const fps = 50; //fps:frame per sec
setInterval(game, 1000 / fps);
