/*jshint esversion: 6 */ 

// Use DOM to grab the area on the High Scores page to insert the high scores and initials.
var highScoreList = document.querySelector("#high-score-list");

// Use DOM to grab clear storage button
var clearStorageBtn = document.querySelector("#clear-scores");

// Use DOM to grab navViewer area to turn it off and on.
var navViewerEl = document.querySelector("#navViewer");

// Use DOM to grab navViewer area to turn it off and on.
var highScoreViewerEl = document.querySelector("#highScoreViewer");

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

// Use DOM to grab the button that the user clicks on the index page to view high scores.
var viewHighScoresBtn = document.querySelector("#view-highScores");

//Use DOM to grab initials entered at the completion of the quiz.
var initialsEntered = document.querySelector("#initials");

// Create empty array to hold high score initials. Eventually will do this via a array of objects.
var highScoresListInitials = [];

// Create empty array to hold high scores. Eventually will do this via a array of objects.
var highScoreListScores = [];

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
    questionTitle:"What is better than coding in JavaScript?",
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

        // If timer runs out run the endQuiz function.
        if (time<=0) {
            endQuiz();
        }
    },1000);

    //Call createQuestion function to display question.
    createQuestion();
}

// Function to generate the question and answer choices via a template literal.
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

// This addEventListener waits for the user to click on their answer. Once they do, it calls the check answer function.
if (questionBank) {
    questionBank.addEventListener("click", function (event) {
    event.preventDefault();
    if (event.target.matches("button")) {
        checkAnswer(event);
    }
});
}

// Functon to check the answer the user inputed against the answer key.
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
           
    // If there are still questions available display next question by calling the createQuestion function.
    else {
        createQuestion ();
    }
}

// This function will end the quiz and let the user know what score the received. 
function endQuiz () {
    clearInterval(timer);
    quizQuestion.style.display="none";
    quizOver.style.display="block";
    finalScore.innerHTML = score;
}

// This function is called upon via the addEventListener for when the user hits the submit button it enter their initials.
function addInitials (event) {
    event.preventDefault(event);

    // If user inputs nothing before they hit the submit button, return to have them enter it again.
    if (initialsEntered.value === "") {
        return;
      }
      
    // Call the retrieve function to retrieve the high scores from the local storage.
    retrieveHighScores();

    // Once the stored scores are added to the high score and initials arrays, add the new score and inititals to the arrays.
    var scoreToPush = (score).toString();
    var initialsToPush = initialsEntered.value.toUpperCase();
    highScoresListInitials.push(initialsToPush);
    highScoreListScores.push(scoreToPush);

    // Call the store high score function to store the updated high scores array to the local storage.
    storeHighScores();

    // Call the retrieve function to retrieve the newly updated high scores so you can render update high score to high score section.
    retrieveHighScores();
}

// This function will retrieve any high scores and initials from local storage.
function retrieveHighScores() {

    // Get stored scores and initials from localStorage.
    // Remember in order to store objects in local or session storage you first have to convert them to a strong with JSON.stringify. 
    // Because they were converted to a string, when you retrieve them they have to be converted back to a object. 
    // You do that with this line of code.
    // Parsing the JSON string to an object
    var storedScores = JSON.parse(localStorage.getItem("highScoresListInitials"));
    var storedInitials = JSON.parse(localStorage.getItem("highScoreListScores"));

    // If scores and initials were retrieved from localStorage, update the highScoresListInitials and highScoreListScores arrays to it
    // !== means if not empty
    if (storedScores !== null) {
        highScoresListInitials = storedScores;
        highScoreListScores = storedInitials;
    }

    // Render high scores to the high scores section, if there weren't any, none will be displayed.
    renderHighScores();
  }

// Function to render high scores on high score list by using DOM to grab high score list ID and adding names and scores to it. 
function renderHighScores () {

    quizSection.style.display="none";
    quizQuestion.style.display="none";
    quizOver.style.display="none";
    navViewerEl.style.display="none";
    highScoreViewerEl.style.display="block";

    // This will clear the high score so that we can add the updated high score list array.
    highScoreList.innerHTML = "";

    // Determine how many entries are in the high score array. Can use either the highScoresListName or highScoresListScore array as they are the same length. 
    // The goal after learning this is to change this to a more efficient manner by using an array of objects that include the property name and property score. 
    var highScoreEntries = highScoreListScores.length;

    for (var i =0; i < highScoreEntries; i++) {

        // Create variables to hold the current index name and score of the entry. 
        var highScoreEntryInitials = highScoresListInitials[i];
        var highScoreEntryScores = highScoreListScores[i];

        // Combine highScoreEntryInitials and highScoreEntryScores into one variable highScoreInitialsAndScore.
        var highScoreEntryInitialsAndScore = (highScoreEntryInitials + "    Score: " + highScoreEntryScores);

        // Create variable li to hold the created li element which we will be adding to the high score list on the high score html page.
        var li = document.createElement("li");

        // Set li textContent to the highScoreEntryInitialsAndScore variable that includes the initials and score.
        li.textContent = highScoreEntryInitialsAndScore;

        // Now using the high score element variable that knows where to insert li on the high score page, append it to the ol.
        highScoreList.appendChild(li);
    }
}

// Function to store high scores and initials arrays to local storage. 
function storeHighScores() {
    // Stringify and set high scores and initials arrays in localStorage
    localStorage.setItem("highScoresListInitials", JSON.stringify(highScoresListInitials));
    localStorage.setItem("highScoreListScores", JSON.stringify(highScoreListScores));   
}

//Function to clear the local storage. Clear it first, them redeclare high scores and initials arrays to empty and render to high score section.
function clearLocalStorage () {
    var confirmClear = confirm("Are you sure you want to clear the high scores?");
    if (confirmClear) {
        localStorage.clear();
        highScoresListInitials = [];
        highScoreListScores = [];
        renderHighScores();
    }
    else {
        return;
    }
}

// Add event listener for when the user clicks on the start quiz button.
if (startQuizBtn) {
    startQuizBtn.addEventListener("click", startQuiz);
}

// Add event listener for when the user clicks the submit button to add their initials.
if (submitInitialsBtn) {
    submitInitialsBtn.addEventListener("click", addInitials);
}
// Add event listener for when the user clicks the high scores button on the home page to retrieve and render high scores.
if (viewHighScoresBtn) {
    viewHighScoresBtn.addEventListener("click", retrieveHighScores);
}
// Add event listener for when the user clicks on the clear the high scores button.
if (clearStorageBtn) {
    clearStorageBtn.addEventListener("click", clearLocalStorage);
}
