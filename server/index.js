require('dotenv').config({ path: '../.env' });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const path = require("path");
const textToSpeech = require("@google-cloud/text-to-speech");

const app = express();
const port = process.env.PORT || 5001; // Use Render's port in production

// Increase payload size limit to handle large images
app.use(bodyParser.json({ limit: "10mb" }));
app.use(cors());

// === Google TTS client setup using credentials from env variable ===
const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
const client = new textToSpeech.TextToSpeechClient({
  credentials: serviceAccount,
});




// === TTS Endpoint ===
app.post("/speak", async (req, res) => {
  const { text } = req.body;

  const request = {
    input: { text },
    voice: { languageCode: "en-US", ssmlGender: "FEMALE" },
    audioConfig: { audioEncoding: "MP3" },
  };

  try {
    const [response] = await client.synthesizeSpeech(request);
    res.set("Content-Type", "audio/mpeg");
    res.send(response.audioContent);
  } catch (error) {
    console.error("TTS Error:", error);
    res.status(500).send("Error generating speech");
  }
});

// === Gemini Vision Endpoint ===
app.post("/api/analyze-image", async (req, res) => {
  const { image } = req.body;
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!image) {
    return res.status(400).json({ error: "No image provided" });
  }

  try {
    const geminiResponse = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent",
      {
        contents: [
          {
            parts: [
              {
                inlineData: {
                  mimeType: "image/jpeg",
                  data: image,
                },
              },
              {
                text: "Describe this image in detail.",
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GEMINI_API_KEY}`,
        },
      }
    );

    const description =
      geminiResponse.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No description available";

    res.json({ description });
  } catch (error) {
    console.error("Gemini API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to analyze image" });
  }
});

// === Serve React Frontend (from /dist) ===
const distPath = path.join(__dirname, "../dist");
app.use(express.static(distPath));

// For React Router — serve index.html on unknown routes
app.get("/*path", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});



// === Start the server ===
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
