const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// FULLSCREEN
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// ГРАВЕЦЬ
let player = {
  lane: 1, // 0 = left, 1 = center, 2 = right
  width: 50,
  height: 50,
  y: canvas.height - 100
};

// ШВИДКІСТЬ
let speed = 2;
let maxSpeed = 12;
let acceleration = 0.01;

// ПЕРЕШКОДИ
let obstacles = [];

function spawnObstacle() {
  let lane = Math.floor(Math.random() * 3);
  obstacles.push({
    lane: lane,
    y: -50,
    width: 50,
    height: 50
  });
}

setInterval(spawnObstacle, 1500);

// КЕРУВАННЯ
document.addEventListener("keydown", (e) => {
  if (e.key === "a" && player.lane > 0) {
    player.lane--;
  }
  if (e.key === "d" && player.lane < 2) {
    player.lane++;
  }
});

// ОНОВЛЕННЯ
function update() {
  speed += acceleration;
  if (speed > maxSpeed) speed = maxSpeed;

  obstacles.forEach(o => {
    o.y += speed;
  });

  // видалення старих
  obstacles = obstacles.filter(o => o.y < canvas.height + 50);
}

// МАЛЮВАННЯ
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let laneWidth = canvas.width / 3;

  // гравець
  let playerX = player.lane * laneWidth + laneWidth / 2 - player.width / 2;
  ctx.fillStyle = "lime";
  ctx.fillRect(playerX, player.y, player.width, player.height);

  // перешкоди
  ctx.fillStyle = "red";
  obstacles.forEach(o => {
    let x = o.lane * laneWidth + laneWidth / 2 - o.width / 2;
    ctx.fillRect(x, o.y, o.width, o.height);
  });
}

// LOOP
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
