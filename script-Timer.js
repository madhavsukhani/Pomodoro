// Select elements
const pomodoro = document.getElementById("pomodoro");
const shortBreak = document.getElementById("short-break");
const longBreak = document.getElementById("long-break"); // New button
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const timerString = document.getElementById("time");

let countdown;
let remainingTime;
let isRunning = false;
let currentMode = 'Pomodoro'; // Default to Pomodoro mode

// Function to update the timer display (format as MM:SS)
function updateTimerDisplay() {
    const minutes = Math.floor(remainingTime / 60); // Get minutes
    const seconds = remainingTime % 60; // Get seconds
    timerString.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`; // Format as MM:SS
}

// Set default values when the page loads
document.addEventListener('DOMContentLoaded', () => {
    updateTimer(); // Call updateTimer to display the default values on page load
});

// Function to update the timer box with the current settings
function updateTimer() {
    const pomodoroValue = pomodoro.value ? parseInt(pomodoro.value) : 25;  // Default to 25 minutes if no value is set
    const breakValue = shortBreak.value ? parseInt(shortBreak.value) : 5;    // Default to 5 minutes if no value is set
    const longBreakValue = longBreak.value ? parseInt(longBreak.value) : 15;  // Default to 15 minutes if no value is set

    // Updates the timer box with the selected mode's time
    if (currentMode === 'Pomodoro') {
        remainingTime = pomodoroValue * 60;  // Convert minutes to seconds
    } else if (currentMode === 'Short-break') {
        remainingTime = breakValue * 60;    // Convert minutes to seconds
    } else if (currentMode === 'Long-break') {
        remainingTime = longBreakValue * 60; // Set Long Break time
    }

    updateTimerDisplay(); // Update the display
}

// Function to start the countdown
function startCountdown() {
    const pomodoroValue = parseInt(pomodoro.value, 10);
    const breakValue = parseInt(shortBreak.value, 10);
    const longBreakValue = parseInt(longBreak.value, 10);

    // Validate the input values
    if (isNaN(pomodoroValue) || pomodoroValue <= 0) {
        alert("Please enter a valid Pomodoro Time.");
        return;  // Exit if the Pomodoro time is not valid
    }
    if (isNaN(breakValue) || breakValue <= 0) {
        alert("Please enter a valid Short Break Time.");
        return;  // Exit if the Short Break time is not valid
    }

    // Set the initial countdown time based on the selected mode
    remainingTime = currentMode === 'Pomodoro' ? pomodoroValue * 60 : 
                    currentMode === 'Short-break' ? breakValue * 60 : 
                    currentMode === 'Long-break' ? longBreakValue * 60 : 0;

    isRunning = true;

    // Update the display immediately
    updateTimerDisplay();

    // Start the countdown
    countdown = setInterval(function () {
        remainingTime--; // Decrease remaining time by 1 second

        // Update the timer display
        updateTimerDisplay();

        // Stop the countdown when the time reaches 0
        if (remainingTime <= 0) {
            clearInterval(countdown);
            isRunning = false;
            timerString.textContent = "Time's up!";

            // Trigger the notification when the timer ends (optional)
            showNotification(`Your ${currentMode} time is up!`);
        }
    }, 1000); // Update every second
}

// Function to pause the countdown
function pauseCountdown() {
    clearInterval(countdown);
    isRunning = false;
}

// Function to reset the countdown
function resetCountdown() {
    clearInterval(countdown);
    isRunning = false;

    // Reset to the selected mode's initial time
    if (currentMode === 'Pomodoro') {
        remainingTime = parseInt(pomodoro.value, 10) * 60;
    } else if (currentMode === 'Short-break') {
        remainingTime = parseInt(shortBreak.value, 10) * 60;
    } else if (currentMode === 'Long-break') {
        remainingTime = parseInt(longBreak.value,10) * 60;
    }

    updateTimerDisplay(); // Reset the display
}

// Function to show notifications (optional)
function showNotification(message) {
    if (Notification.permission === 'granted') {
        new Notification(message);
    }
}

// Event listeners for mode change buttons
document.getElementById('Pomodoro').addEventListener('click', () => {
    currentMode = 'Pomodoro';
    updateTimer(); // Update the timer based on the current mode
});

document.getElementById('Short-break').addEventListener('click', () => {
    currentMode = 'Short-break';
    updateTimer(); // Update the timer based on the current mode
});

document.getElementById('Long-break').addEventListener('click', () => {
    currentMode = 'Long-break';
    updateTimer(); // Update the timer based on the current mode
});

// Event listeners for control buttons
startButton.addEventListener('click', startCountdown);
pauseButton.addEventListener('click', pauseCountdown);
resetButton.addEventListener('click', resetCountdown);

// Apply settings button functionality
const applySettings = document.getElementById('save-changes'); // Fix for missing element
applySettings.addEventListener("click", function() {
    updateTimer(); // Update timer with new values from the modal
    // Hide the modal after saving changes
    const myModal = new bootstrap.Modal(document.getElementById('Timer-Settings'));
    myModal.hide();
});
