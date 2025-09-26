import React, { useRef, useState, useEffect } from 'react';

// Utility imports
import { callVisionAPI, speakTextWithGoogleTTS } from '../utils/speechUtils.js';
// Constants import
import { AI_PROMPTS } from '../utils/promptConstants';

/**
 * ImageTextReader Component
 * Captures images, extracts text using OCR, and provides audio descriptions
 */
function ImageTextReader({ onNavigateHome }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    startCamera();
    return stopCamera;
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' } }, // Use back camera
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        // Ensure video metadata is loaded before play
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
        };
      }
    } catch (err) {
      console.error('Camera access denied:', err);
      alert('Camera access is required to use this feature.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const handleCaptureAndProcess = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    setLoading(true);

    try {
      // Capture image
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // Ensure video has dimensions
      if (video.videoWidth === 0 || video.videoHeight === 0) {
        alert("Camera isn't ready yet. Please wait a second and try again.");
        setLoading(false);
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageDataURL = canvas.toDataURL('image/jpeg');
      const base64 = imageDataURL.split(',')[1];

      // OCR
      const extractedText = await callVisionAPI(base64);
      const cleanText = extractedText?.trim();

      if (!cleanText) {
        alert('No readable text found in the image.');
        setLoading(false);
        return;
      }

      // Gemini API processing
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: AI_PROMPTS.TEXT_EXPLANATION_PROMPT(cleanText) }] }],
        }),
      });

      const data = await response.json();
      const geminiText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!geminiText) {
        alert('Gemini did not return an explanation.');
        setLoading(false);
        return;
      }

      // Speak the result
      speakTextWithGoogleTTS(geminiText);
    } catch (err) {
      console.error('Error during capture and processing:', err);
      alert('An error occurred while processing the image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="camera-screen">
      <h2>Image Text Reader</h2>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="camera-video"
      />
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <button
        onClick={handleCaptureAndProcess}
        disabled={loading}
        className="capture-button"
      >
        {loading ? 'Processing...' : 'Capture'}
      </button>

      <button onClick={onNavigateHome} className="camera-back-button">
        Back to Home
      </button>
    </div>
  );
}

export default ImageTextReader;
