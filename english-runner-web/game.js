window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const startBtn = document.getElementById('startBtn');
    const menu = document.getElementById('menu');

    let gameRunning = false;
    let speed = 5;

    // 🧍 ЛІНІЇ
    const lanes = [200, 350, 500];
    let currentLane = 1;

    // 🎮 ГРАВЕЦЬ
    const player = {
        x: lanes[currentLane],
        y: 300,
        size: 40
    };

    // 📚 ДІЄСЛОВА
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

    // 🎯 СТВОРЕННЯ ПИТАННЯ
    function spawnQuestion() {
        currentVerb = verbs[Math.floor(Math.random() * verbs.length)];

        let answers = [currentVerb.past];

        // додаємо неправильні
        while (answers.length < 3) {
            let random = verbs[Math.floor(Math.random() * verbs.length)].past;
            if (!answers.includes(random)) {
                answers.push(random);
            }
        }

        // перемішуємо
        answers.sort(() => Math.random() - 0.5);

        correctLane = answers.indexOf(currentVerb.past);

        obstacles = answers.map((text, i) => ({
            x: lanes[i],
            y: -50,
            text: text,
            lane: i
        }));
    }

    // ▶️ СТАРТ
    startBtn.addEventListener('click', () => {
        menu.style.display = 'none';
        canvas.style.display = 'block';

        gameRunning = true;
        score = 0;
        lives = 3;

        spawnQuestion();
        requestAnimationFrame(gameLoop);
    });

    // 🎮 КЕРУВАННЯ
    document.addEventListener('keydown', e => {
        if (!gameRunning) return;

        if (e.code === 'ArrowLeft' && currentLane > 0) {
            currentLane--;
        }

        if (e.code === 'ArrowRight' && currentLane < 2) {
            currentLane++;
        }
    });

    // 🔁 ГРА
    function gameLoop() {
        if (!gameRunning) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // оновлюємо позицію гравця
        player.x = lanes[currentLane];

        // 🧍 гравець
        ctx.fillStyle = 'lime';
        ctx.fillRect(player.x - 20, player.y, player.size, player.size);

        // 📚 слово
        ctx.fillStyle = 'white';
        ctx.font = '28px Arial';
        ctx.fillText(`${currentVerb.base} → ?`, 300, 40);

        // 🚧 варіанти
        obstacles.forEach(o => {
            o.y += speed;

            // малюємо блок
            ctx.fillStyle = 'red';
            ctx.fillRect(o.x - 50, o.y, 100, 40);

            ctx.fillStyle = 'white';
            ctx.font = '16px Arial';
            ctx.fillText(o.text, o.x - 30, o.y + 25);

            // 🔴 зіткнення
            if (
                o.y > player.y &&
                o.y < player.y + 40 &&
                o.lane === currentLane
            ) {
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
        ctx.fillText(`Score: ${score}`, 10, 30);
        ctx.fillText(`Lives: ${lives}`, 10, 60);

        requestAnimationFrame(gameLoop);
    }
});
