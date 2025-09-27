import { useEffect, useRef, useState } from "react";

// Utility imports
import { speakTextWithGoogleTTS } from "../utils/speechUtils.js";
import { AI_PROMPTS } from "../utils/promptConstants";

/**
 * ViewDescriptionScreen Component
 * Captures an image from the camera, sends it to Gemini, and speaks the description
 */
function ViewDescriptionScreen({ onNavigateHome }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");

  // 🎥 Start camera stream on mount
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          console.log("[Camera] Stream started");
        }
      } catch (error) {
        console.error("[Camera] Failed to access:", error);
        alert("Camera access is required to use this feature.");
      }
    };

    startCamera();

    return () => {
      // 🛑 Stop camera on unmount
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
        console.log("[Camera] Stream stopped");
      }
    };
  }, []);

  // 📸 Capture and analyze image with Gemini API
  const handleCaptureAndDescribe = async () => {
    if (!videoRef.current || !canvasRef.current) {
      console.warn("[Capture] Missing video or canvas reference");
      return;
    }

    setLoading(true);
    setDescription("");

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageDataUrl = canvas.toDataURL("image/jpeg");
    const base64 = imageDataUrl.split(",")[1];

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    inlineData: {
                      mimeType: "image/jpeg",
                      data: base64,
                    },
                  },
                  {
                    text: AI_PROMPTS.IMAGE_DESCRIPTION_PROMPT,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("[Gemini] API error:", errorText);
        setDescription("Could not analyze the image. Please try again.");
        return;
      }

      const data = await response.json();
      const resultText =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No description available.";

      setDescription(resultText);
      await speakTextWithGoogleTTS(resultText); // 🔊 Match same TTS utility
    } catch (error) {
      console.error("[Capture] Error during analysis:", error);
      setDescription("Something went wrong while analyzing the image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="camera-screen">
      <button
        className="camera-back-button"
        onClick={onNavigateHome}
        aria-label="Go back to home screen"
      >
        Back to Home
      </button>

      <h2>Image Description</h2>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="camera-video"
      />

      <canvas ref={canvasRef} style={{ display: "none" }} />

      <button
        onClick={handleCaptureAndDescribe}
        disabled={loading}
        className="capture-button"
        aria-label="Capture image and hear the description"
      >
        {loading ? "Analyzing..." : "Capture and Describe"}
      </button>

      {description && (
        <p className="camera-description">{description}</p>
      )}
    </div>
  );
}

export default ViewDescriptionScreen;
