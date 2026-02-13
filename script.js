// The Data: Questions and matching Images
const questions = [
    {
        text: "Chips & Cheese 🧀",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ5KChqMHhc_8KQOWE8HrzsSx3ee5C47ALqQ&s"
    },
    {
        text: "Louis Vuitton 👜",
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    },
    {
        text: "Love Island 🏝️",
        image: "https://upload.wikimedia.org/wikipedia/en/3/38/Love_Island_2015_logo.png"
    },
    {
        text: "A good book 📚",
        image: "https://i.ebayimg.com/images/g/V5MAAeSwzEppaYcS/s-l1600.webp"
    },
    {
        text: "Chicago & Nashville combined 🏙️🤠",
        image: "https://images.unsplash.com/photo-1555529733-0e670560f7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
    }
];

let currentIndex = 0;

const questionText = document.getElementById("question-text");
const mainImage = document.getElementById("main-image");
const noBtn = document.getElementById("noBtn");
const gameContainer = document.getElementById("game-container");
const successContainer = document.getElementById("success-container");

// Initialize
updateQuestion();

function updateQuestion() {
    if (currentIndex < questions.length) {
        questionText.innerText = `Do you love me more than ${questions[currentIndex].text}?`;
        mainImage.src = questions[currentIndex].image;
    } else {
        // The Final Question
        questionText.innerText = "Okay... will you be my Valentine? 🌹";
        // Updated with your specific Giphy!
        mainImage.src = "https://media0.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3b2NicHBwcGY1NXhucGFkYWh1NmJkbWRlNzRzZ3RzdXR2N2N0NnBybyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/6KmLHrQhAeH5fC0ZT1/giphy.webp";
    }
}

function nextQuestion() {
    if (currentIndex < questions.length) {
        currentIndex++;
        updateQuestion();
        
        // Reset No button to center
        noBtn.style.position = "static";
    } else {
        // Success!
        gameContainer.classList.add("hidden");
        successContainer.classList.remove("hidden");
        triggerConfetti();
    }
}

// Fixed Runaway No Button Logic
function moveButton() {
    // We use window.innerWidth/Height so it calculates based on the screen size
    // Subtracting the button's width/height and an extra 20px padding so it never touches the absolute edge
    const maxX = window.innerWidth - noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn.offsetHeight - 20;

    // Generate random coordinates within the safe screen area
    // Math.max(10, ...) ensures it never goes past the left or top boundaries (keeps a 10px buffer)
    const randomX = Math.max(10, Math.floor(Math.random() * maxX));
    const randomY = Math.max(10, Math.floor(Math.random() * maxY));

    // 'fixed' locks it to the browser window so it ignores scrollbars and containers
    noBtn.style.position = "fixed";
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
}

// Confetti Configuration
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
