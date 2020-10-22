// Find start quiz button and set a variable to it


var clearScoreBtn = document.querySelector("#clear-scores");


function clearHighScores () {
    alert("Somebody wants to clear the scores!");
}

clearScoreBtn.addEventListener("click", clearHighScores);
    // When somebody wants to clear the scores:
    // Clear score via local storage 
