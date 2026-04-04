window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const startBtn = document.getElementById('startBtn');
    const scoresBtn = document.getElementById('scoresBtn');
    const menu = document.getElementById('menu');

    let gameRunning = false;
    let gameSpeed = 4;

    let player = { x: 50, y: 300, width: 50, height: 50, vy: 0, gravity: 0.6, jumpPower: -12 };
    let isJumping = false;

    let enemies = [{ x: 800, y: 300, width: 50, height: 50 }];

    let score = 0;
    let lives = 3;

    // 🔹 СТАРТ
    startBtn.addEventListener('click', () => {
        menu.style.display = 'none';
        canvas.style.display = 'block';

        gameRunning = true;
        score = 0;
        lives = 3;

        enemies.forEach(e => e.x = 800);

        requestAnimationFrame(gameLoop);
    });

    // 🔹 РЕКОРДИ
    scoresBtn.addEventListener('click', () => {
        alert("Скоро тут будуть рекорди 😎");
    });

    // 🔹 СТРИБОК
    document.addEventListener('keydown', e => {
        if (e.code === 'Space' && !isJumping) {
            player.vy = player.jumpPower;
            isJumping = true;
        }
    });

    // 🔴 ПЕРЕВІРКА ЗІТКНЕННЯ
    function isColliding(a, b) {
        return a.x < b.x + b.width &&
               a.x + a.width > b.x &&
               a.y < b.y + b.height &&
               a.y + a.height > b.y;
    }

    function gameLoop() {
        if (!gameRunning) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Рух гравця
        player.vy += player.gravity;
        player.y += player.vy;

        if (player.y > 300) {
            player.y = 300;
            player.vy = 0;
            isJumping = false;
        }

        // Гравець
        ctx.fillStyle = 'green';
        ctx.fillRect(player.x, player.y, player.width, player.height);

        // Вороги
        enemies.forEach(e => {
            e.x -= gameSpeed;

            if (e.x + e.width < 0) {
                e.x = 800;
                score++; // 🔥 додаємо бали
            }

            // 🔴 зіткнення
            if (isColliding(player, e)) {
                lives--;
                e.x = 800;

                if (lives <= 0) {
                    gameRunning = false;
                    alert("Гра закінчена! Бали: " + score);
                    location.reload();
                }
            }

            ctx.fillStyle = 'red';
            ctx.fillRect(e.x, e.y, e.width, e.height);
        });

        // UI
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText(`Бали: ${score}`, 10, 30);
        ctx.fillText(`Життя: ${lives}`, 10, 60);

        requestAnimationFrame(gameLoop);
    }
});
