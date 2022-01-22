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

var timeLeft = timer;


function startQuiz() {
    timeLeft = 75;
    main.style.display = "block";
    checkAnswer.style.display = "none";
    gameEnd.style.display = "none";
    highscoresDiv.style.display = "none";
    quiz.style.display = "none";

    highscores.textContent = "View High Scores";
    timer.textContent = "Time Remaining: " + timeLeft;

};