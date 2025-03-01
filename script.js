document.addEventListener("DOMContentLoaded", function () {
    window.getQuestion = function () {
        let company = document.getElementById("company").value;
        let role = document.getElementById("role").value;

        if (!company || !role) {
            alert("Please select a company and job role.");
            return;
        }

        fetch("/ask_question", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ company: company, role: role })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById("question-text").innerText = data.question;
            document.getElementById("question-container").style.display = "block";
        });
    };

    window.submitAnswer = function () {
        let question = document.getElementById("question-text").innerText;
        let answer = document.getElementById("answer").value.trim();

        if (!question || !answer) {
            alert("Please provide an answer.");
            return;
        }

        fetch("/evaluate_answer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: question, answer: answer })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById("feedback-text").innerText = data.feedback;
            document.getElementById("answer-container").style.display = "block";
        });
    };
});
