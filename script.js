// ===============================
// HAPPY CALCULATOR
// ===============================


// ---------- CALCULATOR ----------

function appendValue(value) {
    document.getElementById("display").value += value;
}


function clearDisplay() {
    document.getElementById("display").value = "";

    document.getElementById("message").innerText =
        "Let's calculate something! 😊";
}


function deleteLast() {
    let display = document.getElementById("display");

    display.value = display.value.slice(0, -1);
}


function calculate() {
    let display = document.getElementById("display");

    try {
        let expression = display.value;

        if (expression === "") {
            return;
        }

        let result = eval(expression);

        display.value = result;

        addHistory(expression, result);

        document.getElementById("message").innerText =
            "Great job! 🎉 Keep calculating! 😊";
    }

    catch {
        display.value = "";

        document.getElementById("message").innerText =
            "Oops! Try again 😊";
    }
}


// ---------- DARK / LIGHT MODE ----------

function toggleTheme() {
    document.body.classList.toggle("dark-mode");
}


// ---------- MATH CHALLENGE ----------

let correctAnswer = 0;


function startChallenge() {

    let num1 = Math.floor(Math.random() * 20) + 1;

    let num2 = Math.floor(Math.random() * 20) + 1;

    let operations = ["+", "-", "*"];

    let operation =
        operations[Math.floor(Math.random() * operations.length)];


    if (operation === "+") {

        correctAnswer = num1 + num2;

    }

    else if (operation === "-") {

        correctAnswer = num1 - num2;

    }

    else {

        correctAnswer = num1 * num2;

    }


    document.getElementById("question").innerText =
        "What is " + num1 + " " + operation + " " + num2 + " ?";


    document.getElementById("answer").value = "";


    document.getElementById("challengeMessage").innerText =
        "Take your time! 😊";
}


function checkAnswer() {

    let userAnswer =
        Number(document.getElementById("answer").value);


    let message =
        document.getElementById("challengeMessage");


    if (userAnswer === correctAnswer) {

        message.innerText =
            "🎉 Correct! You're amazing! 😊";

    }

    else {

        message.innerText =
            "❌ Not quite! Try again 😊";

    }
}


// ---------- HISTORY ----------

function addHistory(expression, result) {

    let history =
        document.getElementById("history");


    let item =
        document.createElement("li");


    let text =
        document.createElement("span");


    text.innerText =
        expression + " = " + result;


    let deleteButton =
        document.createElement("button");


    deleteButton.innerText = "🗑️";


    deleteButton.className =
        "delete-btn";


    deleteButton.onclick = function () {

        item.remove();

        saveHistory();

    };


    item.appendChild(text);

    item.appendChild(deleteButton);

    history.appendChild(item);


    saveHistory();
}


// ---------- SAVE HISTORY ----------

function saveHistory() {

    let history =
        document.getElementById("history");


    localStorage.setItem(
        "calculatorHistory",
        history.innerHTML
    );
}


// ---------- LOAD HISTORY ----------

function loadHistory() {

    let savedHistory =
        localStorage.getItem("calculatorHistory");


    if (savedHistory) {

        document.getElementById("history").innerHTML =
            savedHistory;


        let items =
            document.querySelectorAll("#history li");


        items.forEach(function (item) {

            let deleteButton =
                item.querySelector(".delete-btn");


            if (deleteButton) {

                deleteButton.onclick = function () {

                    item.remove();

                    saveHistory();

                };

            }

        });

    }
}


// ---------- CLEAR ALL HISTORY ----------

function clearHistory() {

    document.getElementById("history").innerHTML = "";


    localStorage.removeItem("calculatorHistory");


    document.getElementById("message").innerText =
        "History cleared! 😊";
}
// ---------- KEYBOARD SUPPORT ----------
// ---------- KEYBOARD SUPPORT ----------

document.onkeydown = function(event) {

    let key = event.key;

    if (key >= "0" && key <= "9") {
        appendValue(key);
    }

    else if (
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "." ||
        key === "%"
    ) {
        appendValue(key);
    }

    else if (key === "Enter") {
        event.preventDefault();
        calculate();
    }

    else if (key === "Backspace") {
        event.preventDefault();
        deleteLast();
    }

    else if (key === "Escape") {
        clearDisplay();
    }
};


// ---------- LOAD WHEN PAGE OPENS ----------

window.onload = loadHistory;
// ---------- BUTTON SOUND ----------

function playSound() {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();

    let oscillator = audioContext.createOscillator();
    let gainNode = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = 500;

    gainNode.gain.value = 0.08;

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();

    oscillator.stop(audioContext.currentTime + 0.08);
}


// ---------- BUTTON CLICK SOUND ----------

