Skip to content
Monia00001
iregial-verbs
Repository navigation
Code
Issues
Pull requests
Actions
Projects
Wiki
Security and quality
Insights
Settings
Files
Go to file
t
english-runner-web
README.md
game.js
index.html
style.css
iregial-verbs/english-runner-web
/
game.js
in
main

Edit

Preview
Indent mode

Spaces
Indent size

4
Line wrap mode

No wrap
Editing game.js file contents
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
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
Use Control + Shift + m to toggle the tab key moving focus. Alternatively, use esc then tab to move to the next interactive element on the page.
