// Dain Wiseman | 10/12/2025

// Create the Audio object for the background music
var music = new Audio("background.mp3");

// Get Play and Pause buttons
var playBtn = document.getElementById("playBtn");
var pauseBtn = document.getElementById("pauseBtn");

// Play button functionality
playBtn.onclick = function() {
    music.play();
    console.log("Music started playing!");
};

// Pause button functionality
pauseBtn.onclick = function() {
    music.pause();
    console.log("Music paused.");
};