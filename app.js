const gameContainer = document.getElementById("game-container");
const player = document.getElementById("player");
let enemies = [];
let bullets = [];

function createEnemy() {
  const enemy = document.createElement("div");
  enemy.classList.add("enemy");
  enemy.style.top = "-50px";
  enemy.style.left =
    Math.floor(Math.random() * (gameContainer.offsetWidth - 50)) + "px";
  gameContainer.appendChild(enemy);
  enemies.push(enemy);
}

function moveEnemies() {
  enemies.forEach((enemy) => {
    const enemyTop = parseInt(enemy.style.top);
    if (enemyTop >= gameContainer.offsetHeight) {
      enemy.remove();
      enemies = enemies.filter((e) => e !== enemy);
    } else {
      enemy.style.top = enemyTop + 5 + "px";
    }
  });
}

function createBullet() {
  const bullet = document.createElement("div");
  bullet.classList.add("bullet");
  bullet.style.top = player.offsetTop - 10 + "px";
  bullet.style.left = player.offsetLeft + 20 + "px";
  gameContainer.appendChild(bullet);
  bullets.push(bullet);
}

function moveBullets() {
  bullets.forEach((bullet) => {
    const bulletTop = parseInt(bullet.style.top);
    if (bulletTop <= -10) {
      bullet.remove();
      bullets = bullets.filter((b) => b !== bullet);
    } else {
      bullet.style.top = bulletTop - 10 + "px";
      checkBulletCollision(bullet);
    }
  });
}

function checkBulletCollision(bullet) {
  enemies.forEach((enemy) => {
    if (
      bullet.offsetLeft >= enemy.offsetLeft &&
      bullet.offsetLeft <= enemy.offsetLeft + enemy.offsetWidth &&
      bullet.offsetTop <= enemy.offsetTop + enemy.offsetHeight
    ) {
      enemy.remove();
      bullet.remove();
      enemies = enemies.filter((e) => e !== enemy);
      bullets = bullets.filter((b) => b !== bullet);
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowLeft" && player.offsetLeft > 0) {
    player.style.left = player.offsetLeft - 10 + "px";
  }
  if (
    event.code === "ArrowRight" &&
    player.offsetLeft < gameContainer.offsetWidth - player.offsetWidth
  ) {
    player.style.left = player.offsetLeft + 10 + "px";
  }
  if (event.code === "Space") {
    createBullet();
  }
});

setInterval(() => {
  createEnemy();
}, 1000);

setInterval(() => {
  moveEnemies();
  moveBullets();
}, 50);
