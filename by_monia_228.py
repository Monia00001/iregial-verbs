import os

project_name = "english_runner_web"

structure = {
    "app.py": """from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

VERBS = [
    ("go", "went"),
    ("see", "saw"),
    ("eat", "ate"),
    ("take", "took"),
    ("write", "wrote"),
    ("come", "came"),
    ("do", "did"),
    ("make", "made")
]

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/get_verb")
def get_verb():
    verb = random.choice(VERBS)
    return jsonify({"base": verb[0], "past": verb[1]})

@app.route("/check", methods=["POST"])
def check():
    data = request.json
    correct = data["answer"].lower() == data["correct"]
    return jsonify({"result": correct})

if __name__ == "__main__":
    app.run(debug=True)
""",

    "requirements.txt": "flask\n",

    ".gitignore": """__pycache__/
*.pyc
env/
venv/
""",

    "README.md": """# English Runner Web

Online educational game with irregular verbs.

## Run locally:

pip install -r requirements.txt
python app.py
""",

    "templates/index.html": """<!DOCTYPE html>
<html>
<head>
    <title>English Runner</title>
    <link rel="stylesheet" href="/static/style.css">
</head>
<body>
    <h1>🏃 English Runner</h1>
    <div id="game">
        <p id="verb"></p>
        <input type="text" id="answer" placeholder="Past Simple">
        <button onclick="checkAnswer()">Check</button>
        <p id="result"></p>
    </div>
    <script src="/static/game.js"></script>
</body>
</html>
""",

    "static/style.css": """body {
    text-align: center;
    font-family: Arial;
    background: #111;
    color: white;
}

input {
    padding: 10px;
}

button {
    padding: 10px;
    cursor: pointer;
}
""",

    "static/game.js": """let correctAnswer = "";

function loadVerb() {
    fetch("/get_verb")
    .then(res => res.json())
    .then(data => {
        document.getElementById("verb").innerText = "Base form: " + data.base;
        correctAnswer = data.past;
    });
}

function checkAnswer() {
    let answer = document.getElementById("answer").value;

    fetch("/check", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            answer: answer,
            correct: correctAnswer
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.result) {
            document.getElementById("result").innerText = "✅ Correct!";
        } else {
            document.getElementById("result").innerText = "❌ Wrong!";
        }
        document.getElementById("answer").value = "";
        loadVerb();
    });
}

loadVerb();
"""
}

# Create folders
os.makedirs(project_name, exist_ok=True)
os.makedirs(f"{project_name}/templates", exist_ok=True)
os.makedirs(f"{project_name}/static", exist_ok=True)

# Create files
for path, content in structure.items():
    full_path = os.path.join(project_name, path)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)

print("✅ Web project created successfully!")
print("📂 Folder:", project_name)
print("🚀 Next steps:")
print("cd english_runner_web")
print("pip install -r requirements.txt")
print("python app.py")
