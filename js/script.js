const unlockHour = 17; // 5:00 PM

window.onload = () => {
    document.getElementById("phase1").classList.add("active");
};

function checkAnswer() {
    const inputField = document.getElementById("answerInput");
    const errorMsg = document.getElementById("errorMessage");
    const answer = inputField.value.toLowerCase().trim();
    
    // Accepts "you" or "me" as correct answers
    if (answer === "you" || answer === "me") {
        showPhase2(true); 
    } else {
        inputField.classList.add("shake");
        errorMsg.classList.remove("hidden");
        
        setTimeout(() => {
            inputField.classList.remove("shake");
        }, 500);
    }
}

function showPhase2(animate = true) {
    const phase1 = document.getElementById("phase1");
    const phase2 = document.getElementById("phase2");
    
    if (animate) {
        phase1.classList.remove("active");
        setTimeout(() => {
            phase1.classList.add("hidden");
            phase2.classList.remove("hidden");
            setTimeout(() => phase2.classList.add("active"), 50);
            checkTime();
        }, 500); 
    } else {
        phase1.classList.add("hidden");
        phase1.classList.remove("active");
        phase2.classList.remove("hidden");
        phase2.classList.add("active");
        checkTime();
    }
}

function checkTime() {
    const currentHour = new Date().getHours();
    
    if (currentHour >= unlockHour) {
        const phase2 = document.getElementById("phase2");
        const phase3 = document.getElementById("phase3");
        
        phase2.classList.remove("active");
        setTimeout(() => {
            phase2.classList.add("hidden");
            phase3.classList.remove("hidden");
            setTimeout(() => phase3.classList.add("active"), 50);
        }, 500);
    }
}