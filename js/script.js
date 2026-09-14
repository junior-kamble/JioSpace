const unlockHour = 17; // 5:00 PM

const phaseConfig = {
    "phase1": { title: "A Little Something For Youuuuu🌼", theme: "theme-day1" },
    "phase2": { title: "A Little Something For You ✨", theme: "theme-day1" },
    "phase3": { title: "i dont have doubt", theme: "theme-day1" },
    "phase4": { title: "Almost There...", theme: "theme-day1" },
    "phase5": { title: "For Your Playlist 🎵", theme: "theme-day1" },
    "phase6": { title: "See You Soon... ☕", theme: "theme-day1" }
};

window.onload = () => {
    const firstCard = document.getElementById("phase1") || document.getElementById("day2-step1");
    if (firstCard) firstCard.classList.add("active");
};

function checkPhoneAnswer() {
    const inputField = document.getElementById("phoneInput");
    const errorMsg = document.getElementById("phoneError");
    const answer = inputField.value.trim();
    
    if (answer === "73") {
        const form = document.getElementById('notificationForm');
        if (form) {
            const formData = new FormData(form);
            fetch(form.action, { method: 'POST', body: formData }).catch(err => console.log(err));
        }
        fadeTransition("phase1", "phase2");
    } else {
        inputField.classList.add("shake");
        errorMsg.classList.remove("hidden");
        setTimeout(() => inputField.classList.remove("shake"), 500);
    }
}

function goBack(currentId, targetId) {
    if (currentId === 'phase3') {
        document.getElementById('ask-music').classList.remove('hidden');
        document.getElementById('ask-language').classList.add('hidden');
        document.getElementById('musicMsg').classList.add('hidden');
    }
    fadeTransition(currentId, targetId);
}

function guessWho() {
    fadeTransition("phase2", "phase3");
}

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

function clickHindi() {
    const msg = document.getElementById("musicMsg");
    msg.innerText = "You can't feel it... go for English! 😉";
    msg.classList.remove("hidden");
}

function clickEnglish() {
    fadeTransition("phase3", "phase4");
}

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

function fadeTransition(hideId, showId, checkVaultTime = false) {
    const hideElement = document.getElementById(hideId);
    const showElement = document.getElementById(showId);
    const mainTitleElement = document.getElementById("mainTitle");
    
    if(mainTitleElement) mainTitleElement.style.opacity = '0';
    hideElement.classList.remove("active");
    
    setTimeout(() => {
        if(mainTitleElement) {
            mainTitleElement.innerText = phaseConfig[showId].title;
            document.body.className = phaseConfig[showId].theme;
        }
        hideElement.classList.add("hidden");
        showElement.classList.remove("hidden");
        
        setTimeout(() => {
            if(mainTitleElement) mainTitleElement.style.opacity = '1';
            showElement.classList.add("active");
        }, 50);
        
        if (checkVaultTime) {
            checkTime();
        }
    }, 500);
}

function checkTime() {
    const currentHour = new Date().getHours();
    if (currentHour >= unlockHour) {
        setTimeout(() => {
            fadeTransition("phase5", "phase6");
        }, 3000); 
    }
}