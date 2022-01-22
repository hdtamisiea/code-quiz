var highscores = document.querySelector("#highscores");
var timer = document.querySelector("#timer");
var main = document.querySelector("#main");
var begin = document.querySelector("#begin");
var quiz = document.querySelector(".quiz");
var question = document.querySelector(".question");
var answerA = document.querySelector("#answerA");
var answerB = document.querySelector("#answerB");
var answerC = document.querySelector("#answerC");
var answerD = document.querySelector("#answerD");
var gradeDiv = document.querySelector("#grade")
var gameEnd = document.querySelector(".gameEnd");
var finalScore = document.querySelector("#finalScore");
var initialsDetails = document.querySelector("#initialsDetails");
var highscoreDetails = document.querySelector("#highscoreDetails");
var initials = document.querySelector("#initials");
var submitBtn = document.querySelector("#submitBtn");
var highscoresDiv = document.querySelector(".highscoresDiv");
var highscoresText = document.querySelector("#highscoresText");
var highscoresInfo = document.querySelector("#highscoresInfo");
var returnBtn = document.querySelector("#returnBtn");
var clearBtn = document.querySelector("#clearBtn");

var lastQuest = question.length - 1;
var timeLeft = timer;
var currentQuest = 0;
var timeInterval;


// Array of questions
var questions = [
    {
        q1: "Which 3 properties affect the box model?",
        a1: "Margin, padding, border",
        a2: "margin, padding-top, padding-bottom",
        a3: "Length, margin, border",
        a4: "Height, margin, border",
        correctAnswer: "answerA"
    },

    {
        q1: "Which is the best description of a variable?",
        a1: "Identifies a portion of a string",
        a2: "A method to join strings",
        a3: "Allows you to store information so it can be reused throughout the program",
        a4: "Allows you to make a decision based on a condition",
        correctAnswer: "answerC"
    },

    {
        q1: "Which of the following methods will allow you to access elements in the DOM?",
        a1: "getDocumentByName",
        a2: "getElementById",
        a3: "getElementByClass",
        a4: "getDocumentById",
        correctAnswer: "answerB"
    },

    {
        q1: "Which of the following is NOT considered a Mouse Event?",
        a1: "click",
        a2: "dblclick",
        a3: "mouseenter",
        a4: "mouserun",
        correctAnswer: "answerD"
    },

    {
        q1: "Which of the following will 'comment out' a selected portion of code in html, css or javascript?",
        a1: "highlight target, shift + c",
        a2: "highlight target, ctrl + /",
        a3: "highlight target, shift + /",
        a4: "highlight target, ctrl + c",
        correctAnswer: "answerB"
    },
];


// Begin Quiz
function startQuiz() {
    timeLeft = 75;
    main.style.display = "block";
    gradeDiv.style.display = "none";
    gameEnd.style.display = "none";
    highscoresDiv.style.display = "none";
    quiz.style.display = "none";

    timer.textContent = 'Time Remaining: ' + timeLeft;
    currentQuest = 0;

};

begin.onclick = countdown;

// Function to begin countdown and stop when countdown reaches zero
function countdown() {
    timeInterval = setInterval(function () {
        if (timeLeft > 0) {
            timer.textContent = "Time Remaining: " + timeLeft;
            timeLeft--;
        } else {
            timer.textContent = "Time Remaining: " + timeLeft;
            clearInterval(timeInterval);
            gameOver();
        }
    }, 1000);
    quizQuestions();
};

// Questions
function quizQuestions() {
    main.style.display = "none";
    quiz.style.display = "block";
    
    var quest = questions[currentQuest];

    question.textContent = quest.q1;
    answerA.textContent = 'A. ' + quest.a1;
    answerB.textContent = 'B. ' + quest.a2;
    answerC.textContent = 'C. ' + quest.a3;
    answerD.textContent = 'D. ' + quest.a4;
};

//  Check Answers
function grade(answer) {
    // Is answer correct?
    if (answer === questions[currentQuest].correctAnswer) {
        answerIsCorrect();
    } else {
        answerIsWrong();
    }
    // If more questions - go to next question
    if (currentQuest < lastQuest) {
        currentQuest++;
        quizQuestions();
        // If there are no more questions, the game is over
    } else {
        timer.textContent = "Time Remaining: " + timeLeft;
        clearInterval(timeInterval);
        gameOver();
    }
}

// If answer is correct:
function answerIsCorrect() {
    gradeDiv.textContent = "Great job!";
    gradeDiv.style.display = "block";
};

// If answer is wrong:
function answerIsWrong() {
    gradeDiv.textContent = "Sorry - 10 points deducted for incorrect answer!";
    gradeDiv.style.display = "block";
    timeLeft = timeLeft - 10;
};

// Game over function
var finalScore;
function gameOver() {
    header.style.display = "block";
    main.style.display = "none";
    quiz.style.display = "none";
    gameEnd.style.display = "block";
    highscoresDiv.style.display = "none";

    finalScore.textContent = "Your score is " + timeLeft;
};

// Capturing initials and score when game over
submitBtn.addEventListener("click", function (event) {
    event.preventDefault();
    var enteredInitials = initials.value;
    clearInterval(timeInterval);

    if (enteredInitials) {
        var storedInitials = JSON.parse(localStorage.getItem("score")) || [];

        storedInitials.push(enteredInitials + " - " + timeLeft);

        localStorage.setItem("score", JSON.stringify(storedInitials));
        highscoresSection();
    } else if (enteredInitials === "" || enteredInitials === null) {
        alert("Please enter your initials!");
    }
});

// Clear highscores button clicked
clearBtn.addEventListener("click", function () {
    highscoresInfo.textContent = "";
    localStorage.clear();
})

// Go back button clicked
returnBtn.addEventListener("click", function () {
    startQuiz();
    timer.style.display = "block";
})

// view highscores
highscores.addEventListener("click", function () {
    highscoresSection();
});

// Leaderboard
var highscoresSection = function () {
    gradeDiv.style.display = "none";
    gameEnd.style.display = "none";
    main.style.display = "none";
    quiz.style.display = "none";
    highscores.textContent = "";
    timer.style.display = "none";
    highscoresDiv.style.display = "block";

    if (localStorage.getItem("score") === null) {
        list.textContent = "";

        var storedInitials = JSON.parse(localStorage.getItem("score")) || [];

        for (i = 0; i < storedInitials.length; i++) {
            var list = document.createElement("li");
            var hsInfo = storedInitials[i];
            list.textContent = hsInfo;
            highscoresInfo.appendChild(list);
        }
    };
}

startQuiz();



