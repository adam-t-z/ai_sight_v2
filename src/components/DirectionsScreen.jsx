import { useState, useEffect } from "react";

// Utility imports
import { getImprovedDirections, speakTextWithGoogleTTS } from "../utils/speechUtils.js";
import { loadGoogleMapsScript } from "../utils/googleMapsLoader.js";

import { AI_PROMPTS } from '../utils/promptConstants';

/**
 * DirectionsScreen Component
 * Handles walking directions using Google Maps API and enhanced AI descriptions
 */
function DirectionsScreen({ onNavigateHome }) {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);
  const [isLoadingMaps, setIsLoadingMaps] = useState(false);

  // Load Google Maps on component mount
  useEffect(() => {
    const initializeGoogleMaps = async () => {
      try {
        setIsLoadingMaps(true);
        await loadGoogleMapsScript();
        setIsGoogleMapsLoaded(true);
        console.log("Google Maps loaded successfully");
      } catch (error) {
        console.error("Failed to load Google Maps:", error);
        alert("Failed to load Google Maps. Please check your internet connection and API key.");
      } finally {
        setIsLoadingMaps(false);
      }
    };

    initializeGoogleMaps();
  }, []);

  const handleGetDirections = async (start = origin, end = destination) => {
    if (!start || !end) {
      alert("Please provide both starting location and destination.");
      return;
    }

    if (!isGoogleMapsLoaded) {
      alert("Google Maps is still loading. Please wait a moment and try again.");
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: start,
        destination: end,
        travelMode: window.google.maps.TravelMode.WALKING,
      },
      async (result, status) => {
        if (status === "OK") {
          const leg = result.routes[0].legs[0];
          const steps = leg.steps;

          const simpleInstructions = steps.map((step, index) => {
            const distance = step.distance.text;
            const maneuver = step.maneuver || "";

            if (index === steps.length - 1) {
              return `Walk ${distance}. Your destination is ahead.`;
            }

            if (maneuver.includes("right")) return `Walk ${distance}, then turn right.`;
            if (maneuver.includes("left")) return `Walk ${distance}, then turn left.`;
            if (maneuver.includes("straight")) return `Walk straight for ${distance}.`;

            return `Walk ${distance}.`;
          });

          const rawInstructions = simpleInstructions.join(" ");
          console.log("🛠 Raw Instructions:", rawInstructions);

          try {
            const improved = await getImprovedDirections(AI_PROMPTS.DIRECTIONS_PROMPT(rawInstructions));

            console.log("🤖 AI-enhanced directions:", improved);
            await speakTextWithGoogleTTS(improved);
          } catch (err) {
            console.error("Error getting enhanced directions:", err);
            // Fallback to basic TTS if available
            if ('speechSynthesis' in window) {
              const utterance = new SpeechSynthesisUtterance(rawInstructions);
              speechSynthesis.speak(utterance);
            }
          }
        } else {
          alert("Could not get directions. Please check your locations and try again.");
        }
      }
    );
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser. Please type your locations instead.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.start();
    console.log("🎤 Listening for directions...");

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("Voice input received:", transcript);

      const parts = transcript.toLowerCase().split(" to ");

      if (parts.length === 2) {
        const [start, end] = parts;

        const originWithCity = `${start.trim()} Amman`;
        const destinationWithCity = `${end.trim()} Amman`;

        setOrigin(originWithCity);
        setDestination(destinationWithCity);
        handleGetDirections(originWithCity, destinationWithCity);
      } else {
        alert("Please say your route like: from Hashem Restaurant to Citadel");
      }
    };

    recognition.onerror = (event) => {
      console.error("Voice recognition error:", event.error);
      alert("Voice input error. Please try typing your locations instead.");
    };

    recognition.onend = () => {
      console.log("🎤 Voice input finished");
    };
  };

  return (
    <div className="directions-screen">
      <button 
        className="back-button" 
        onClick={onNavigateHome}
        aria-label="Go back to home screen"
      >
        Back to Home
      </button>
      
      <form onSubmit={(e) => { e.preventDefault(); handleGetDirections(); }}>
        <label htmlFor="origin">From (starting location):</label>
        <input
          id="origin"
          type="text"
          placeholder="Enter where you are starting from"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          aria-required="true"
        />
        
        <label htmlFor="destination">To (destination):</label>
        <input
          id="destination"
          type="text"
          placeholder="Enter where you want to go"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          aria-required="true"
        />

        <button 
          type="submit"
          className="get-directions-button"
          aria-label="Get walking directions and hear them spoken"
          disabled={!isGoogleMapsLoaded || isLoadingMaps}
        >
          {isLoadingMaps ? "Loading Maps..." : "Get Directions"}
        </button>
      </form>
      
      <button 
        className="voice-button"
        onClick={handleVoiceInput}
        aria-label="Use voice to say your route, for example: from downtown to university"
        disabled={!isGoogleMapsLoaded || isLoadingMaps}
      >
        Use Voice Input
      </button>
      
      {isLoadingMaps && (
        <p style={{ textAlign: 'center', color: '#cccccc' }}>
          Loading Google Maps...
        </p>
      )}
    </div>
  );
}

export default DirectionsScreen;