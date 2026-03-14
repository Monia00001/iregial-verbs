window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const startBtn = document.getElementById('startBtn');
    const scoresBtn = document.getElementById('scoresBtn');
    const menu = document.getElementById('menu');

    let gameRunning = false;
    let gameSpeed = 2;

    // Персонаж
    let player = { x: 50, y: 300, width: 50, height: 50, vy: 0, gravity: 0.5, jumpPower: -10 };
    let isJumping = false;

    // Вороги
    let enemies = [{ x: 800, y: 300, width: 50, height: 50 }];

    // Бали та життя
    let score = 0;
    let lives = 3;

    // --- Кнопки меню ---
    startBtn.addEventListener('click', () => {
        menu.style.display = 'none';
        canvas.style.display = 'block';
        gameRunning = true;
        score = 0;
        lives = 3;
        enemies.forEach(e => e.x = 800);
        requestAnimationFrame(gameLoop);
    });

    scoresBtn.addEventListener('click', () => {
        alert("Тут будуть рекорди!");
    });

    // Стрибок
    document.addEventListener('keydown', e => {
        if (e.code === 'Space' && !isJumping) {
            player.vy = player.jumpPower;
            isJumping = true;
        }
    });

    // Основний цикл
    function gameLoop() {
        if (!gameRunning) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Рух гравця
        player.vy += player.gravity;
        player.y += player.vy;
        if (player.y > 300) { player.y = 300; player.vy = 0; isJumping = false; }

        // Малюємо гравця
        ctx.fillStyle = 'green';
        ctx.fillRect(player.x, player.y, player.width, player.height);

        // Рух ворогів
        enemies.forEach(e => {
            e.x -= gameSpeed;
            if (e.x + e.width < 0) e.x = 800;
            ctx.fillStyle = 'red';
            ctx.fillRect(e.x, e.y, e.width, e.height);
        });

        // Бали та життя
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText(`Бали: ${score}`, 10, 30);
        ctx.fillText(`Життя: ${lives}`, 10, 60);

        requestAnimationFrame(gameLoop);
    }
});
