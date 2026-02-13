const noBtn = document.getElementById("noBtn");
const askContainer = document.getElementById("ask-container");
const successContainer = document.getElementById("success-container");

// Function to move the "No" button randomly
function moveButton() {
    // Get the container dimensions
    const containerRect = askContainer.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // Calculate max positions to keep button inside the card (mostly)
    // We add a little randomness to make it jump around
    const maxX = containerRect.width - btnRect.width;
    const maxY = containerRect.height - btnRect.height;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    noBtn.style.position = "absolute";
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
}

// Function to handle the "Yes" click
function sayYes() {
    // Hide the question, show the success message
    askContainer.classList.add("hidden");
    successContainer.classList.remove("hidden");

    // Trigger Confetti
    triggerConfetti();
}

// Confetti Effect
function triggerConfetti() {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const random = function(min, max) {
        return Math.random() * (max - min) + min;
    };

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // multiple confetti sources
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}
