// Find start quiz button and set a variable to it

var startQuizBtn = document.querySelector("#quiz-start");
// var clearScoreBtn = document.querySelector("#clear-scores");
var submitInitialsBtn = document.querySelector("#submit-initials");
var quizSection = document.querySelector("#quiz-home");
var quizQuestion = document.querySelector("#quiz-questions");
var quizOver = document.querySelector("#quiz-over");

// console.log("clearScoreBtn :" + clearScoreBtn);

// function clearHighScores () {
//     alert("Somebody wants to clear the scores!");
// }

function startQuiz () {
    quizSection.style.visibility="hidden";
    quizQuestion.style.visibility="visible";
    alert("Somebody wants to take the quiz!");
}

function addInitials () {
    alert("Somebody wants to add their initials to the leaderboard!");
}

// clearScoreBtn.addEventListener("click", clearHighScores);
    // When somebody wants to clear the scores:
    // Clear score via local storage 

submitInitialsBtn.addEventListener("click", addInitials);
    // When somebody wants to clear the scores:
    // Clear score via local storage 

startQuizBtn.addEventListener("click", startQuiz);
    // When somebody needs to start the quiz:
    // Start timer
    // Hide start quiz-home div via id="quiz-home"
    // Show quiz-questions div via id="quiz-questions"
    // Track right or wrong and adjust time / score



