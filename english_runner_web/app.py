from flask import Flask, render_template, request, jsonify
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
