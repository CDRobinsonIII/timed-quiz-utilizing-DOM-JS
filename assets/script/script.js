// Find start quiz button and set a variable to it

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

function startQuiz () {
    quizSection.style.display="none";
    quizQuestion.style.display="block";
    displayQuestion.innerHTML = questionPool[1].questionTitle;
    
    // for Loop to display all 4 answer choices
    for (var i = 0; i < 4; i++) {
        var choices = questionPool[1].possibleAnswers[i];
        console.log(choices);
        var btn = document.createElement("button");
        btn.textContent = choices;
        answerChoices.appendChild(btn).setAttribute("class", "p-3 m-1 btn btn-info btn-lg btn-block");
    }     

    answerChoices.addEventListener("click", function (event) {
        if (event.target.matches("button")) {
            var theirAnswer = event.target.textContent;
            alert ("They picked answer :" + theirAnswer);
            console.log(theirAnswer);  
            var correctAnswer = questionPool[1].answerKey;
            console.log("The answer key is: " + correctAnswer);
        if (theirAnswer === correctAnswer) {
            rightOrWrongSection.setAttribute("class","rightAnswer");
            // rightOrWrongSection.innerHTML= " ";
            rightOrWrongSection.innerHTML="You are CORRECT!";
        }
        else {
        rightOrWrongSection.setAttribute("class","wrongAnswer");
        rightOrWrongSection.innerHTML="You are WRONG!";
        }
    } 
    });

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