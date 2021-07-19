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
  y: 3*cvs.height / 4,
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
render();
// function movePaddle(evt) {
//   let rect = cvs.getBoundingClientRect();

//   user.y = evt.clientY - rect.top - user.height / 2;
// }

//collision detection


//loop
const fps = 50; //fps:frame per sec
setInterval(game, 1000 / fps);
