export async function listGoogleTTSVoices() {
  try {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // Use your actual env var
    const endpoint = `https://texttospeech.googleapis.com/v1/voices?key=${apiKey}`;

    const response = await fetch(endpoint);
    const data = await response.json();

    if (!data.voices) {
      console.error("❌ No voices returned. Check API key and project setup.");
      console.log("Full response:", data);
      return;
    }

    console.log("✅ Available voices:");
    data.voices.forEach((voice) => {
      console.log(`• ${voice.name} | Language: ${voice.languageCodes.join(', ')} | Gender: ${voice.ssmlGender}`);
    });
  } catch (err) {
    console.error("❌ Error fetching voices:", err);
  }
}
