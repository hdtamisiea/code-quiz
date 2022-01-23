// set up global variables for everything in html/removed those unnecessary
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
var yourScore = document.querySelector("#yourScore");
var initialsInput = document.querySelector("#initials");
var submitBtn = document.querySelector("#submitBtn");
var highscoresDiv = document.querySelector(".highscoresDiv");
var highscoresText = document.querySelector("#highscoresText");
var highscoresInfo = document.querySelector("#highscoresInfo");
var returnBtn = document.querySelector("#returnBtn");
var clearBtn = document.querySelector("#clearHighscores");

// added global variables
var timeLeft = timer;
var currentQuest = 0;
var timeInterval;

// Start countdown function when begin button is clicked
begin.onclick = countdown;

// Countdown function which triggers the questions to run until all questions answered or time is up
function countdown() {
    timeInterval = setInterval(function () {
        if (timeLeft > 0) {
            timer.textContent = 'Time: ' + timeLeft;
            timeLeft--;
        } else {
            timer.textContent = 'Time: ' + timeLeft;
            clearInterval(timeInterval);
            gameOver();
        }
    }, 1000);
    quizQuestions();
};

// questions and answers put into an array with correct answer listed
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

// Function to begin questions and hide the landing page. Sets timer at 75 seconds.
function startQuiz() {
    timeLeft = 75;
    main.style.display = 'block';
    highscores.textContent = 'View High Scores';
    gradeDiv.style.display = 'none';
    gameEnd.style.display = 'none';
    highscoresDiv.style.display = 'none';
    quiz.style.display = 'none';
    timer.textContent = 'Time: ' + timeLeft;
    currentQuest = 0;
};

// This actually displays the questions/answers on the page
function quizQuestions() {
    main.style.display = 'none';
    quiz.style.display = 'block';
    var quest = questions[currentQuest];

    question.textContent = quest.q1;
    answerA.textContent = 'A. ' + quest.a1;
    answerB.textContent = 'B. ' + quest.a2;
    answerC.textContent = 'C. ' + quest.a3;
    answerD.textContent = 'D. ' + quest.a4;
};

var lastQuest = questions.length - 1;

// function to check answers to see if they are correct - and also has if/else so if there are more questions they will display.  If no more questions the game is over.
function grade(answer) {
    if (answer === questions[currentQuest].correctAnswer) {
        answerIsCorrect();
    } else {
        answerIsWrong();
    }

    if (currentQuest < lastQuest) {
        currentQuest++;
        quizQuestions();
        //if there are no more questions, display end/ game over
    } else {
        timer.textContent = 'Time: ' + timeLeft;
        clearInterval(timeInterval);
        gameOver();
    }
}

// Displays message notifying user whether they have answered correctly
function answerIsCorrect() {
    gradeDiv.textContent = 'Correct!';
    gradeDiv.style.display = 'block';
}

// Displays message notifying user whether they have answered correctly
function answerIsWrong() {
    gradeDiv.textContent = 'Wrong!';
    gradeDiv.style.display = 'block';
    timeLeft = timeLeft - 10;
}

// When the game is over a new box appears notifying the game is over and provides final score
var yourScore;
function gameOver() {
    quiz.style.display = 'none';
    main.style.display = 'none';
    highscoresDiv.style.display = 'none';
    gameEnd.style.display = 'block';
    yourScore.textContent = 'Your final score is ' + timeLeft;
}

// At end of game, when score is displayed, the user is prompted to enter initials. This information is then saved to local storage. If initials are blank user will receive an alert to enter.
submitBtn.addEventListener('click', function (event) {
    event.preventDefault();
    var enteredInitials = initialsInput.value;
    clearInterval(timeInterval);

    if (enteredInitials) {
        var storedInitials = JSON.parse(localStorage.getItem('score')) || [];
        storedInitials.push(enteredInitials + ' - ' + timeLeft);
        localStorage.setItem('score', JSON.stringify(storedInitials));
        highscoresSec();
    } else if (enteredInitials === '' || enteredInitials === null) {
        alert('Please enter your initials!');
    }
});

// If you click highscores link at top of page, it will take you to leaderboard
highscores.addEventListener('click', function () {
    highscoresSec();
});

// Once the initials are submitted, the leaderboard is displayed and the initials-score from above are displayed with other scored from local storage. The user has option of clearing the leaderboard:
clearBtn.addEventListener('click', function () {
    highscoresInfo.textContent = '';
    localStorage.clear();
})

// Or they can return to the quiz:
returnBtn.addEventListener('click', function () {
    startQuiz();
    timer.style.display = 'block';
})

// Leaderboard section - displays on page. Checks local storage for content and displays.
var highscoresSec = function () {
    gradeDiv.style.display = 'none';
    gameEnd.style.display = 'none';
    main.style.display = 'none';
    quiz.style.display = 'none';
    highscores.textContent = '';
    timer.style.display = 'none';
    highscoresDiv.style.display = 'block';

    // check if anything stored in localStorage
    if (localStorage.getItem('score') === null) {
        list.textContent = '';
    } else {
        highscoresInfo.textContent = '';

        var storedInitials = JSON.parse(localStorage.getItem('score')) || [];
        // Loop for creating a new list element for current user and displays on leaderboard.
        for (i = 0; i < storedInitials.length; i++) {
            var list = document.createElement("li");
            var hsInfo = storedInitials[i];
            list.textContent = hsInfo;
            highscoresInfo.appendChild(list);
        }
    };
}

startQuiz();