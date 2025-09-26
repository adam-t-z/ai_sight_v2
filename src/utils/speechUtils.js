import { AI_PROMPTS } from "./promptConstants"; // Adjust the path if needed

/**
 * Speech and AI Utilities
 * Provides functions for AI-enhanced directions, text-to-speech, and OCR capabilities
 */

// Gemini AI API call for directions
export async function getImprovedDirections(promptText) {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;


    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: AI_PROMPTS.DIRECTIONS_PROMPT(promptText),
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API Error:", {
        status: response.status,
        statusText: response.statusText,
        errorText,
      });
      throw new Error(`Gemini API Error: ${response.status}`);
    }

    const data = await response.json();

    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No valid response from Gemini."
    );
  } catch (err) {
    console.error("Error fetching improved directions:", err);
    return "Error fetching improved directions.";
  }
}

// Google Text-to-Speech API - Frontend implementation
export async function speakTextWithGoogleTTS(text) {
  try {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const endpoint = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`;
    
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: { text },
          voice: { languageCode: 'en-US', ssmlGender: 'FEMALE' },
          // voice: {
          //   languageCode: 'en-US',
          //   name: 'en-US-Neural2-A', // Most human-like female assistant voice
          // },
          audioConfig: { audioEncoding: 'MP3' },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('TTS API Error:', {
        status: response.status,
        statusText: response.statusText,
        errorText,
      });
      throw new Error('TTS request failed');
    }

    const data = await response.json();
    const audioContent = data.audioContent;
    if (!audioContent) throw new Error('No audio content returned');

    const audioSrc = `data:audio/mp3;base64,${audioContent}`;
    const audio = new Audio(audioSrc);
    audio.play();
  } catch (err) {
    console.error('TTS error:', err);
    alert('Failed to use Google TTS.');
  }
}


// Google Vision API - Frontend implementation for OCR
export async function callVisionAPI(base64Image) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const endpoint = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;
  
  const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requests: [
          {
            image: { content: base64Image },
            features: [{ type: 'TEXT_DETECTION' }],
          },
        ],
      }),
    }
  );

  const data = await response.json();
  if (data.responses && data.responses[0]?.fullTextAnnotation) {
    return data.responses[0].fullTextAnnotation.text;
  }
  return '';
}