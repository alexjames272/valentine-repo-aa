// The "Love Gauntlet" List
const loveItems = [
    "Chips & Cheese 🧀",
    "Louis Vuitton 👜",
    "Love Island 🏝️",
    "A good book 📚",
    "Chicago & Nashville combined 🏙️🤠"
];

let currentIndex = 0;

const questionText = document.getElementById("question-text");
const noBtn = document.getElementById("noBtn");
const gameContainer = document.getElementById("game-container");
const successContainer = document.getElementById("success-container");
const mainGif = document.getElementById("main-gif");

// Initialize first question
updateQuestion();

function updateQuestion() {
    if (currentIndex < loveItems.length) {
        questionText.innerText = `Do you love me more than ${loveItems[currentIndex]}?`;
        // Optional: Change GIF here if you want specific ones for specific questions
    } else {
        questionText.innerText = "Okay... will you be my Valentine? 🌹";
        mainGif.src = "https://media.tenor.com/kaCNrX9wN3gAAAAi/cute-begging.gif"; // Begging GIF
    }
}

function nextQuestion() {
    if (currentIndex < loveItems.length) {
        // Move to next item
        currentIndex++;
        updateQuestion();
        
        // RESET the "No" button position so it tempts her again
        noBtn.style.position = "static";
        
    } else {
        // Only here does the game end
        gameContainer.classList.add("hidden");
        successContainer.classList.remove("hidden");
        triggerConfetti();
    }
}

// The "No" button runs away
function moveButton() {
    // Get container boundaries
    const containerRect = document.querySelector('.container').getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // Calculate max positions
    const maxX = containerRect.width - btnRect.width - 20; // -20 for padding
    const maxY = containerRect.height - btnRect.height - 20;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    noBtn.style.position = "absolute";
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
}

// Confetti Effect
function triggerConfetti() {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const random = function(min, max) { return Math.random() * (max - min) + min; };

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}
