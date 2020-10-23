// Find start quiz button and set a variable to it

var startQuizBtn = document.querySelector("#quiz-start");
var clearScoreBtn = document.querySelector("#clear-scores");
var submitInitialsBtn = document.querySelector("#submit-initials");
var initialsHighScore = document.querySelector("#initials");
var quizSection = document.querySelector("#quiz-home");
var quizQuestion = document.querySelector("#quiz-questions");
var quizOver = document.querySelector("#quiz-over");


questionPool = [{
    questionTitle:"What is 2+2?",
    possibleAnswers: ["4","6","9","12"],
    answerKey: "4"
},{
    questionTitle:"What is 4*4?",
    possibleAnswers: ["4","12","16","24"],
    answerKey: "16"
},{
    questionTitle:"What is 6/6?",
    possibleAnswers: ["43","6","9","23"],
    answerKey: "1"
},{
    questionTitle:"What is 8-8?",
    possibleAnswers: ["0","6123","129","2"],
    answerKey: "0"
},{
    questionTitle:"What is 2+3+4+5?",
    possibleAnswers: ["412","16","14","152"],
    answerKey: "14"
}];


function clearHighScores () {
    alert("Somebody wants to clear the scores!");
}

function startQuiz () {
    quizSection.style.display="none";
    quizQuestion.style.display="block";
    alert("Somebody wants to take the quiz!");
    for (var i=1; i < questionPool.length+1; i++) {
        alert("This is question # " + i + ": " + questionPool[i].questionTitle);
    }
}

function addInitials () {
    alert("This is what was entered in initial submit button: " +initialsHighScore.value);
    console.log(initialsHighScore.value);
}
submitInitialsBtn.addEventListener("click", addInitials);
startQuizBtn.addEventListener("click", startQuiz);
clearScoreBtn.addEventListener("click", clearHighScores);



// submitInitialsBtn.addEventListener("click", addInitials);
    // When somebody wants to clear the scores:
    // Clear score via local storage 
    
// clearScoreBtn.addEventListener("click", clearHighScores);
// When somebody wants to clear the scores:
// Clear score via local storage

// startQuizBtn.addEventListener("click", startQuiz);
    // When somebody needs to start the quiz:
    // Start timer
    // Hide start quiz-home div via id="quiz-home"
    // Show quiz-questions div via id="quiz-questions"
    // Track right or wrong and adjust time / score
 




