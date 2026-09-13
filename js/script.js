const unlockHour = 17; // 5:00 PM

window.onload = () => {
    document.getElementById("phase1").classList.add("active");
};

// Step 1: Moves from Riddle to the Music Question
function guessWho() {
    fadeTransition("phase1", "phase2");
}

// Step 2: Handles the Hindi/English clicks
function clickHindi() {
    const msg = document.getElementById("musicMsg");
    msg.innerText = "You can't feel it... go for English! 😉";
    msg.classList.remove("hidden");
}

function clickEnglish() {
    fadeTransition("phase2", "phase3");
}

// Step 3: Checks the final answer
function checkFinalAnswer() {
    const inputField = document.getElementById("answerInput");
    const errorMsg = document.getElementById("errorMessage");
    const answer = inputField.value.toLowerCase().trim();
    
    // Accepts "me" or "you"
    if (answer === "me" || answer === "you") {
        fadeTransition("phase3", "phase4", true); 
    } else {
        inputField.classList.add("shake");
        errorMsg.classList.remove("hidden");
        setTimeout(() => inputField.classList.remove("shake"), 500);
    }
}

// Reusable animation function for smooth transitions
function fadeTransition(hideId, showId, checkVaultTime = false) {
    const hideElement = document.getElementById(hideId);
    const showElement = document.getElementById(showId);
    
    hideElement.classList.remove("active");
    setTimeout(() => {
        hideElement.classList.add("hidden");
        showElement.classList.remove("hidden");
        setTimeout(() => showElement.classList.add("active"), 50);
        
        if (checkVaultTime) {
            checkTime();
        }
    }, 500);
}

// Checks if it is 5:00 PM for the Grand Finale
function checkTime() {
    const currentHour = new Date().getHours();
    
    if (currentHour >= unlockHour) {
        setTimeout(() => {
            fadeTransition("phase4", "phase5");
        }, 3000); // Waits 3 seconds on the music page before jumping to the finale if it's past 5 PM
    }
}