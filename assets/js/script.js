var welcomeDiv = docutment.querySelector("#welcome-div");
// var welcomeDiv = document.getElementById("welcome-div");
var questionsDiv = document.getElementById("questions-div");
var startBtn = document.getElementById("start-btn");

var number = 75;

// var timeLeft = 75;
// var timer = setInterval(function() {
//     if(timeLeft <= 0){
//         clearInterval(timer);
// } else timeleft--;
// // console.log(timeLeft);

// })
console.dir(questionsDiv)

startBtn.addEventListener("click", displayQuestion)

function displayQuestion() {
    questionsDiv.style.display = "block";
    welcomeDiv.style.display = "none";

    setInterval(countDown, 1000)
};
displayQuestion();

function countDown () {
    console.log(number)
    number--;
}
