const unlockHour = 17; // 5:00 PM

// Check local storage as soon as the page loads
window.onload = () => {
    if (localStorage.getItem("phase2Unlocked") === "true") {
        showPhase2(false); // Load without animation if already unlocked
    } else {
        document.getElementById("phase1").classList.add("active");
    }
};

function checkAnswer() {
    const inputField = document.getElementById("answerInput");
    const errorMsg = document.getElementById("errorMessage");
    const answer = inputField.value.toLowerCase().trim();
    
    if (answer === "youtube") {
        localStorage.setItem("phase2Unlocked", "true");
        showPhase2(true); // Trigger the fade-in animation
    } else {
        // Trigger the red shake error animation
        inputField.classList.add("shake");
        errorMsg.classList.remove("hidden");
        
        // Remove the shake class after half a second so it can be triggered again
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
            // Slight delay allows the CSS transition to process smoothly
            setTimeout(() => phase2.classList.add("active"), 50);
            checkTime();
        }, 500); 
    } else {
        // Immediate swap if the page is refreshed after unlocking
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