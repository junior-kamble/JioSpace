const unlockHour = 17; // 5:00 PM

const phaseConfig = {
    "phase1": { title: "A Little Something For You ✨", theme: "theme-phase1" },
    "phase2": { title: "A Little Something For You ✨", theme: "theme-phase2" },
    "phase3": { title: "i dont have any doubt", theme: "theme-phase3" },
    "phase4": { title: "Almost There...", theme: "theme-phase4" },
    "phase5": { title: "For Your Playlist 🎵", theme: "theme-phase5" },
    "phase6": { title: "See You Soon... ☕", theme: "theme-phase6" }
};

window.onload = () => {
    document.getElementById("phase1").classList.add("active");
};

// Check Phone Number Challenge (73)
function checkPhoneAnswer() {
    const inputField = document.getElementById("phoneInput");
    const errorMsg = document.getElementById("phoneError");
    const answer = inputField.value.trim();
    
    if (answer === "73") {
        fadeTransition("phase1", "phase2");
    } else {
        inputField.classList.add("shake");
        errorMsg.classList.remove("hidden");
        setTimeout(() => inputField.classList.remove("shake"), 500);
    }
}

// Universal Back Button Logic
function goBack(currentId, targetId) {
    if (currentId === 'phase3') {
        document.getElementById('ask-music').classList.remove('hidden');
        document.getElementById('ask-language').classList.add('hidden');
        document.getElementById('musicMsg').classList.add('hidden');
    }
    fadeTransition(currentId, targetId);
}

// Step 2: Moves from Phone Check to Riddle
function guessWho() {
    fadeTransition("phase2", "phase3");
}

// Step 3: Hides "Yes" and reveals Language buttons
function likeMusicYes() {
    const askMusic = document.getElementById("ask-music");
    const askLanguage = document.getElementById("ask-language");
    
    askMusic.style.opacity = '0';
    setTimeout(() => {
        askMusic.classList.add("hidden");
        askLanguage.classList.remove("hidden");
        askMusic.style.opacity = '1'; 
    }, 300);
}

// Step 3b: Handles Hindi/English clicks
function clickHindi() {
    const msg = document.getElementById("musicMsg");
    msg.innerText = "You can't feel it... go for English! 😉";
    msg.classList.remove("hidden");
}

function clickEnglish() {
    fadeTransition("phase3", "phase4");
}

// Step 4: Checks final question answer
function checkFinalAnswer() {
    const inputField = document.getElementById("answerInput");
    const errorMsg = document.getElementById("errorMessage");
    const answer = inputField.value.toLowerCase().trim();
    
    if (answer === "me" || answer === "you") {
        fadeTransition("phase4", "phase5", true); 
    } else {
        inputField.classList.add("shake");
        errorMsg.classList.remove("hidden");
        setTimeout(() => inputField.classList.remove("shake"), 500);
    }
}

// Master Animation Function
function fadeTransition(hideId, showId, checkVaultTime = false) {
    const hideElement = document.getElementById(hideId);
    const showElement = document.getElementById(showId);
    const mainTitleElement = document.getElementById("mainTitle");
    
    mainTitleElement.style.opacity = '0';
    hideElement.classList.remove("active");
    
    setTimeout(() => {
        mainTitleElement.innerText = phaseConfig[showId].title;
        document.body.className = phaseConfig[showId].theme;
        
        hideElement.classList.add("hidden");
        showElement.classList.remove("hidden");
        
        setTimeout(() => {
            mainTitleElement.style.opacity = '1';
            showElement.classList.add("active");
        }, 50);
        
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
            fadeTransition("phase5", "phase6");
        }, 3000); 
    }
}