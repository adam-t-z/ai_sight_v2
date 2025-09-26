import { useEffect } from "react";
import { listGoogleTTSVoices } from "../utils/listGoogleTTSVoices"; // Adjust path if needed

function VoiceChecker() {
  useEffect(() => {
    listGoogleTTSVoices();
  }, []);

  return <div>✅ Check the browser console for available voices.</div>;
}

export default VoiceChecker;
