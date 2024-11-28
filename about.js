// script.js
let currentSlide = 0; // Tracks the current slide index
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

// Function to navigate slides
function navigateSlides(direction) {
    // Remove the active class from the current slide
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    slides[currentSlide].scrollIntoView({ behavior: 'smooth' });
    slides[currentSlide].classList.add('active');
}

// Add scroll event listener
window.addEventListener('wheel', (event) => {
    if (event.deltaY > 0) {
        navigateSlides(1); // Scroll down
    } else {
        navigateSlides(-1); // Scroll up
    }
});

// Add keyboard navigation
window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown') {
        navigateSlides(1);
    } else if (event.key === 'ArrowUp') {
        navigateSlides(-1);
    }
});
