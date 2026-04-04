const canvas = document.getElementById("game");

if (!canvas) {
  alert("Canvas не знайдений!");
}

const ctx = canvas.getContext("2d");

// resize
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

// гравець
let player = {
  lane: 1,
  width: 60,
  height: 60,
  y: 0
};

// після resize ставимо позицію
player.y = canvas.height - 120;

// рух
document.addEventListener("keydown", (e) => {
  if (e.key === "a" && player.lane > 0) player.lane--;
  if (e.key === "d" && player.lane < 2) player.lane++;
});

// draw
function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let laneWidth = canvas.width / 3;

  let x = player.lane * laneWidth + laneWidth / 2 - player.width / 2;

  ctx.fillStyle = "lime";
  ctx.fillRect(x, player.y, player.width, player.height);

  // DEBUG TEXT (щоб точно бачити що працює)
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("GAME WORKS", 20, 40);
}

// loop
function loop() {
  draw();
  requestAnimationFrame(loop);
}

loop();
