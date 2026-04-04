window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const startBtn = document.getElementById('startBtn');
    const menu = document.getElementById('menu');

    let gameRunning = false;
    let speed = 2;        // стартова швидкість
    let maxSpeed = 10;    // максимальна швидкість

    // Лінії руху (left, center, right)
    const lanes = [200, 350, 500];
    let currentLane = 1;

    // Гравець
    const player = {
        x: lanes[currentLane],
        y: 300,
        size: 40
    };

    // Дієслова
    const verbs = [
        { base: "go", past: "went" },
        { base: "eat", past: "ate" },
        { base: "see", past: "saw" },
        { base: "take", past: "took" },
        { base: "come", past: "came" },
        { base: "make", past: "made" },
        { base: "find", past: "found" }
    ];

    let obstacles = [];
    let currentVerb = null;
    let correctLane = 0;

    let score = 0;
    let lives = 3;

    // Генеруємо питання
    function spawnQuestion() {
        currentVerb = verbs[Math.floor(Math.random() * verbs.length)];

        let answers = [currentVerb.past];

        while (answers.length < 3) {
            let random = verbs[Math.floor(Math.random() * verbs.length)].past;
            if (!answers.includes(random)) answers.push(random);
        }

        answers.sort(() => Math.random() - 0.5);

        correctLane = answers.indexOf(currentVerb.past);

        obstacles = answers.map((text, i) => ({
            x: lanes[i],
            y: -50,
            text: text,
            lane: i
        }));
    }

    // Старт гри
    startBtn.addEventListener('click', () => {
        menu.style.display = 'none';
        canvas.style.display = 'block';

        gameRunning = true;
        score = 0;
        lives = 3;

        spawnQuestion();
        requestAnimationFrame(gameLoop);
    });

    // Керування гравцем
    document.addEventListener('keydown', e => {
        if (!gameRunning) return;

        if (e.code === 'ArrowLeft' && currentLane > 0) {
            currentLane--;
        }

        if (e.code === 'ArrowRight' && currentLane < 2) {
            currentLane++;
        }
    });

    // Головний цикл
    function gameLoop() {
        if (!gameRunning) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // плавне прискорення
        if (speed < maxSpeed) speed += 0.002;

        // рух гравця
        player.x = lanes[currentLane];
        ctx.fillStyle = 'lime';
        ctx.fillRect(player.x - 20, player.y, player.size, player.size);

        // текст питання
        ctx.fillStyle = 'white';
        ctx.font = '28px Arial';
        ctx.fillText(`${currentVerb.base} → ?`, 300, 40);

        // рух і зіткнення з блоками
        obstacles.forEach(o => {
            o.y += speed + score * 0.02;  // швидкість росте з часом

            // малюємо блок
            ctx.fillStyle = 'red';
            ctx.fillRect(o.x - 50, o.y, 100, 40);

            ctx.fillStyle = 'white';
            ctx.font = '16px Arial';
            ctx.fillText(o.text, o.x - 30, o.y + 25);

            // зіткнення
            if (o.y > player.y && o.y < player.y + player.size && o.lane === currentLane) {
                if (o.lane === correctLane) {
                    score += 5;
                } else {
                    lives--;
                }

                if (lives <= 0) {
                    gameRunning = false;
                    alert("Game Over! Score: " + score);
                    location.reload();
                }

                spawnQuestion();
            }
        });

        // UI
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText(`Score: ${score}`, 10, 30);
        ctx.fillText(`Lives: ${lives}`, 10, 60);

        requestAnimationFrame(gameLoop);
    }
});
