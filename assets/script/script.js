/*jshint esversion: 6 */ 

// Use DOM to grab button to start the quiz to use with addEventListner
var startQuizBtn = document.querySelector("#quiz-start");

// Use DOM to grab button used to submit initials to use with addEventListner
var submitInitialsBtn = document.querySelector("#submit-initials");

// Use DOM to grab initials that were entered at the end of the game. 
var initialsHighScore = document.querySelector("#initials");

// Use DOM to grab the quiz section of the index.html page, and use turn display on and off accordingly
var quizSection = document.querySelector("#quiz-home");

// Use DOM to grab the quiz question section of the index.html page, and use turn display on and off accordingly
var quizQuestion = document.querySelector("#quiz-questions");

// Use DOM to grab the quiz over section of the index.html page, and use turn display on and off accordingly
var quizOver = document.querySelector("#quiz-over");

// Use DOM to grab area we will be displaying the question.
var displayQuestion = document.querySelector("#quiz-question");

// Use DOM to grab area we will be displaying the answers to choose from.
var answerChoices = document.querySelector("#answer-choices");

// Use DOM to grab area where we tell user if they got the answer right or wrong! 
var rightOrWrongSection = document.querySelector("#rightOrWrong");

// Use DOM to grab button where timer is displayed.
var timerDisplay = document.querySelector("#timerTracker");

// Use DOM to grab area to insert question and answer choice via a template literal.
var questionBank = document.querySelector("#quiz-holder");


// Creat varaiable question pool for 5 questions, using an array of objects.
var questionPool = [{
    questionTitle:"What is 2+2?",
    possibleAnswers: ["4","6","9","12"],
    answerKey: "4"
},{
    questionTitle:"What is 4*4?",
    possibleAnswers: ["4","12","16","24"],
    answerKey: "16"
},{
    questionTitle:"What is 6/6?",
    possibleAnswers: ["43","1","9","23"],
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
        console.log(timer);

        // if (timer<=0) {
        //     endQuiz();
        // }
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

    //Call the checkAnswer function to see if the user got the answer correct or wrong.
    checkAnswer();
  }

questionBank.addEventListener("click", function (event) {
    if (event.target.matches("button")) {
        checkAnswer(event);
    }
});


function checkAnswer (event) {

    var theirAnswer = event.target.textContent;
    var correctAnswer = questionPool[questionIndex].answerKey;
    console.log("Somebody clicked the button");
    
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
        time = time -5;
    }
    
    // Increase questionIndex counter to move on to the next question.
    questionIndex++;
    console.log("Question coming up is #: " +(questionIndex+1));
    console.log("You're score is: " + score);
      
    //Clear right or wrong innerHTML for next question.
    // rightOrWrongSection.innerHTML=" ";


    // check to see if there are anymore questions. If not, call the end quiz function.
    if (questionIndex === questionIndex.length) {
            endQuiz ();
    }

    // Display next question by calling the createQuestion function.
    createQuestion ();
}
    


function addInitials () {
    alert("This is what was entered in initial submit button: " +initialsHighScore.value);
    console.log(initialsHighScore.value);
}

submitInitialsBtn.addEventListener("click", addInitials);
    // When some enters initials and clicks submit
    // Add to high scores array
    // High scores should be stored in local storage

startQuizBtn.addEventListener("click", startQuiz);
    // When somebody needs to start the quiz:
    // Start timer
    // Hide start quiz-home div via id="quiz-home"
    // Show quiz-questions div via id="quiz-questions"
    // Track right or wrong and adjust time score