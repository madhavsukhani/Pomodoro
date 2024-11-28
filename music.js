document.addEventListener('DOMContentLoaded', () => {
    // Get references to the audio element and button
    const music = document.getElementById('background-music');
    const button = document.getElementById('music-toggle-button');

    // SVG icons as strings
    const playIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M400-120q-66 0-113-47t-47-113q0-66 47-113t113-47q23 0 42.5 5.5T480-418v-422h240v160H560v400q0 66-47 113t-113 47Z"/></svg>`;
    const pauseIcon = `
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M792-56 56-792l56-56 736 736-56 56ZM560-514l-80-80v-246h240v160H560v166ZM400-120q-66 0-113-47t-47-113q0-66 47-113t113-47q23 0 42.5 5.5T480-418v-62l80 80v120q0 66-47 113t-113 47Z"/></svg>`;

    // Set the initial state: music is playing, button shows pause icon
    music.play().catch(() => {
        // Handle autoplay restriction: set the button to play icon
        button.innerHTML = playIcon;
    });
    button.innerHTML = pauseIcon;
    let isPlaying = false;

    // Toggle playback on button click
    button.addEventListener('click', () => {
        if (isPlaying==true) {
            music.pause();
            button.innerHTML = playIcon;
        } else {
            music.play();
            button.innerHTML = pauseIcon;
        }
        isPlaying = !isPlaying;
    });
});
