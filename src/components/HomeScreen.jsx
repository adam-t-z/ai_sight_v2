import React from "react";
import "../style/App.css"; // Make sure this path matches your project structure

/**
 * Plays an audio file from the public/audio folder
/**
 * Plays an audio file from the public/audio folder
 * @param {string} filename - The name of the audio file (e.g., "money.mp3")
 */
function playAudio(filename) {
  const audioPath = `/audio/${filename}`; // Explicit path to public/audio
  const audio = new Audio(audioPath);
  audio.play().catch(err => console.error("Audio playback failed:", err));
}


/**
 * HomeScreen Component
 * Main navigation hub for the application
 */
function HomeScreen({
  onNavigateToDirections,
  onNavigateToViewDescription,
  onNavigateToImageTextReader,
  onNavigateToMoneyDetection,
  onNavigateToDoorDetection,
}) {
  return (
    <div className="home-screen">
      {/* Money Count button */}
      <button
        className="start-button money-button"
        onClick={() => {
          playAudio("money_mode.mp3");
          onNavigateToMoneyDetection();
        }}
        aria-label="Count money in uploaded images"
      >
        Money Count
      </button>

      {/* Door Detection button */}
      <button
        className="start-button door-button"
        onClick={() => {
          playAudio("door.mp3");
          onNavigateToDoorDetection();
        }}
        aria-label="Detect doors in uploaded images"
      >
        Door Detection
      </button>

      {/* Walking Directions button */}
      <button
        className="start-button directions-button"
        onClick={() => {
          playAudio("dir.mp3");
          onNavigateToDirections();
        }}
        aria-label="Start getting walking directions"
      >
        Walking Directions
      </button>

      {/* View Description button */}
      <button
        className="start-button description-button"
        onClick={() => {
          playAudio("infront.mp3");
          onNavigateToViewDescription();
        }}
        aria-label="Upload an image and get a description"
      >
        View Description
      </button>

      {/* Read Text from Image button */}
      <button
        className="start-button text-reader-button"
        onClick={() => {
          playAudio("text.mp3");
          onNavigateToImageTextReader();
        }}
        aria-label="Upload an image and read text aloud"
      >
        Read Text from Image
      </button>

      {/* Sarah button */}
      <button
        className="start-button sarah-button"
        aria-label="Sarah button"
      >
        Sarah
      </button>
    </div>
  );
}

export default HomeScreen;
