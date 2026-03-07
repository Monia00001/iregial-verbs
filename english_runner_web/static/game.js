let correctAnswer = "";

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
