window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const startBtn = document.getElementById('startBtn');
    const scoresBtn = document.getElementById('scoresBtn');
    const menu = document.getElementById('menu');

    let gameRunning = false;
    let gameSpeed = 4;

    // 🎮 ГРАВЕЦЬ
    let player = { x: 50, y: 300, width: 50, height: 50, vy: 0, gravity: 0.6, jumpPower: -12 };
    let isJumping = false;

    // 👾 ВОРОГИ
    let enemies = [{ x: 800, y: 300, width: 50, height: 50 }];

    // ❤️ СТАТИ
    let score = 0;
    let lives = 3;

    // 📚 ДІЄСЛОВА
    const verbs = [
        { base: "go", past: "went" },
        { base: "eat", past: "ate" },
        { base: "see", past: "saw" },
        { base: "take", past: "took" },
        { base: "come", past: "came" },
        { base: "make", past: "made" }
    ];

    let currentVerb = null;
    let options = [];
    let correctIndex = 0;

    // 🎯 ГЕНЕРАЦІЯ ПИТАННЯ
    function generateQuestion() {
        currentVerb = verbs[Math.floor(Math.random() * verbs.length)];

        let wrong;
        do {
            wrong = verbs[Math.floor(Math.random() * verbs.length)].past;
        } while (wrong === currentVerb.past);

        options = [currentVerb.past, wrong];
        options.sort(() => Math.random() - 0.5);

        correctIndex = options.indexOf(currentVerb.past);
    }

    // ▶️ СТАРТ
    startBtn.addEventListener('click', () => {
        menu.style.display = 'none';
        canvas.style.display = 'block';

        gameRunning = true;
        score = 0;
        lives = 3;

        generateQuestion();

        enemies.forEach(e => e.x = 800);

        requestAnimationFrame(gameLoop);
    });

    // 🏆 РЕКОРДИ
    scoresBtn.addEventListener('click', () => {
        alert("Скоро будуть рекорди 😎");
    });

    // ⬆️ СТРИБОК
    document.addEventListener('keydown', e => {
        if (e.code === 'Space' && !isJumping) {
            player.vy = player.jumpPower;
            isJumping = true;
        }
    });

    // ⬅️➡️ ВИБІР ВІДПОВІДІ
    document.addEventListener('keydown', e => {
        if (!gameRunning) return;

        if (e.code === 'ArrowLeft') {
            checkAnswer(0);
        }

        if (e.code === 'ArrowRight') {
            checkAnswer(1);
        }
    });

    // ✔️❌ ПЕРЕВІРКА
    function checkAnswer(index) {
        if (index === correctIndex) {
            score += 2;
        } else {
            lives--;
        }

        generateQuestion();
    }

    // 🔴 ЗІТКНЕННЯ
    function isColliding(a, b) {
        return a.x < b.x + b.width &&
               a.x + a.width > b.x &&
               a.y < b.y + b.height &&
               a.y + a.height > b.y;
    }

    // 🔁 ГОЛОВНИЙ ЦИКЛ
    function gameLoop() {
        if (!gameRunning) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // рух гравця
        player.vy += player.gravity;
        player.y += player.vy;

        if (player.y > 300) {
            player.y = 300;
            player.vy = 0;
            isJumping = false;
        }

        // гравець
        ctx.fillStyle = 'green';
        ctx.fillRect(player.x, player.y, player.width, player.height);

        // вороги
        enemies.forEach(e => {
            e.x -= gameSpeed;

            if (e.x + e.width < 0) {
                e.x = 800;
                score++;
            }

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

        // 📚 ТЕКСТ ПИТАННЯ
        ctx.fillStyle = 'white';
        ctx.font = '28px Arial';
        ctx.fillText(`${currentVerb.base} → ?`, 300, 50);

        ctx.font = '20px Arial';
        ctx.fillText(`← ${options[0]}`, 250, 100);
        ctx.fillText(`${options[1]} →`, 450, 100);

        // UI
        ctx.fillText(`Бали: ${score}`, 10, 30);
        ctx.fillText(`Життя: ${lives}`, 10, 60);

        requestAnimationFrame(gameLoop);
    }
});
