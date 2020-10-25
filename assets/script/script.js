/*jshint esversion: 6 */ 

// Use DOM to grab button to start the quiz to use with addEventListner
var startQuizBtn = document.querySelector("#quiz-start");

// Use DOM to grab button used to submit initials to use with addEventListner
var submitInitialsBtn = document.querySelector("#submit-initials");

// Use DOM to grab the quiz section of the index.html page, and use turn display on and off accordingly
var quizSection = document.querySelector("#quiz-home");

// Use DOM to grab the quiz question section of the index.html page, and use turn display on and off accordingly
var quizQuestion = document.querySelector("#quiz-questions");

// Use DOM to grab the quiz over section of the index.html page, and use turn display on and off accordingly
var quizOver = document.querySelector("#quiz-done");

// Use DOM to grab area where we tell user if they got the answer right or wrong! 
var rightOrWrongSection = document.querySelector("#rightOrWrong");

// Use DOM to grab button where timer is displayed.
var timerDisplay = document.querySelector("#timerTracker");

// Use DOM to grab area to insert question and answer choice via a template literal.
var questionBank = document.querySelector("#quiz-holder");

// Use DOM to grab area to put final score.
var finalScore = document.querySelector("#final-score");

//Use DOM to grab initials entered at the completion of the quiz.
var initialsEntered = document.querySelector("#initials");

var initialsHighScore = [];
var initialsScore = [];


// Creat varaiable question pool for 5 questions, using an array of objects.
var questionPool = [{
    questionTitle:"What variable scope covers the whole JavaScript file?",
    possibleAnswers: ["Local","Global","Block","Function"],
    answerKey: "Global"
},{
    questionTitle:"What does is DOM short for in JavaScript?",
    possibleAnswers: ["Dominic","Document Object Model","Dominican republic","Dom Perignon"],
    answerKey: "Document Object Model"
},{
    questionTitle:"What is another word for regular old JavaScript?",
    possibleAnswers: ["Chocolate","Old Technology","Vanilla","Complicated Coding"],
    answerKey: "Vanilla"
},{
    questionTitle:"What do you call a function inside of a function?",
    possibleAnswers: ["Ridiculous","Unnecessary","A Nested Function","Unheard Of"],
    answerKey: "A Nested Function"
},{
    questionTitle:"What is better than coding in JavaScript",
    possibleAnswers: ["Everything","jQuery","Sleeping","Eating"],
    answerKey: "jQuery"
}];

//Create time variable, timer variable to give user 60 seconds for quiz, score variable, and questionIndex to start at 0.
var time = 60;
var timer = 0;
var questionIndex = 0;
var score = 0;

// Start quiz function that is called after the start quiz button is clicked on. 
function startQuiz () {
    // Hide the start the quiz section and show the quiz question section
    quizSection.style.display="none";
    quizQuestion.style.display="block";

    // Start the timer.
    timer = setInterval(function() {

        //Substract 1 second from the timer. 
        time--;

        //Show the updated time on timer section on the main page. 
        timerDisplay.innerHTML = time;

        if (time<=0) {
            endQuiz();
        }
    },1000);

    //Call createQuestion function to display question.
    createQuestion();
}


function createQuestion() {

    //create question markUp in var
    var questionMarkUp = `
     
    <h2 id="quiz-question">${questionPool[questionIndex].questionTitle}</h2>
    <div id ="answer-options">
        <div id="answer-choices">
            <button type="button" class= "p-3 m-1 btn btn-info btn-lg btn-block">${questionPool[questionIndex].possibleAnswers[0]}</button>
            <button type="button" class= "p-3 m-1 btn btn-info btn-lg btn-block">${questionPool[questionIndex].possibleAnswers[1]}</button>
            <button type="button" class= "p-3 m-1 btn btn-info btn-lg btn-block">${questionPool[questionIndex].possibleAnswers[2]}</button>
            <button type="button" class= "p-3 m-1 btn btn-info btn-lg btn-block">${questionPool[questionIndex].possibleAnswers[3]}</button>
        </div>
    </div>
    `;

    //inject the markUp into #questionBank convert to html
    questionBank.innerHTML = questionMarkUp;
  }

questionBank.addEventListener("click", function (event) {
    event.preventDefault();
    if (event.target.matches("button")) {
        checkAnswer(event);
    }
});


function checkAnswer (event) {

    var theirAnswer = event.target.textContent;
    var correctAnswer = questionPool[questionIndex].answerKey;

    if (theirAnswer === correctAnswer) {
        rightOrWrongSection.setAttribute("class","rightAnswer");

        // Let them know that they picked the correct answer.
        rightOrWrongSection.innerHTML="You are CORRECT!";

        // Add 100 to their score.
        score=score+100;
        }
    
    else {
        rightOrWrongSection.setAttribute("class","wrongAnswer");

        // Let them know they picked the wrong answer.
         rightOrWrongSection.innerHTML="You are WRONG!";

        // Decrease time left by 5 seconds as penalty.
        time = time -10;
    }
    
    // Increase questionIndex counter to move on to the next question.
    questionIndex++;
      
    // Clear right or wrong innerHTML for next question.
    rightOrWrongSection.innerHTML=" ";


    // check to see if there are anymore questions. If not, call the end quiz function.
    if (questionIndex === questionPool.length) {
            endQuiz ();
    }

    // Display next question by calling the createQuestion function.
    createQuestion ();
}
    
function endQuiz () {
    clearInterval(timer);
    quizQuestion.style.display="none";
    quizOver.style.display="block";
    finalScore.innerHTML = score;
}

function addInitials (event) {
    event.preventDefault(event);
    window.location = "high_scores.html";
    initialsEntered.push="initialsEntered.value";
    initialsScore.push="score";
}

// Add event listener for when the user clicks on the start quiz button.
startQuizBtn.addEventListener("click", startQuiz);

// Add event listener for when the user clicks the submit button to add their initials.
submitInitialsBtn.addEventListener("click", addInitials);