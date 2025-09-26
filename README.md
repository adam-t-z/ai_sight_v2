# AI Sight - Walking Directions Assistant

A pwa (progressive web app that has OFFLINE features) AI application designed to assist visually impaired users with navigation and object detection using computer vision and text-to-speech technology.

presentation:
https://www.canva.com/design/DAG0E9aRTEk/VLnPrsdst3PRbWGfe3-xWA/view?utm_content=DAG0E9aRTEk&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h45a1f11f82

## Key Features

### 🏠 Offline Capabilities
- **Money Detection**: Completely offline AI processing - no internet required
- **Door Detection**: Local YOLOv8 model runs entirely in your browser
- **Privacy First**: No images or data sent to external servers for these features

### 🏠 Home Screen
- Central navigation hub with voice announcements
- Easy access to all detection features
- Intuitive button layout for accessibility

### 🚶 Walking Directions
- Real-time GPS-based navigation assistance
- Turn-by-turn voice directions
- Integration with Google Maps for accurate routing
- Continuous location tracking and updates

### 🚪 Door Detection
- **Works completely offline** - AI-powered door recognition using YOLOv8
- Real-time camera feed analysis with local processing
- Visual bounding boxes around detected doors
- Voice announcements of door locations
- No internet connection required for detection

### 💰 Money Detection
- **Works completely offline** - Currency recognition and counting
- Local AI model identifies and calculates total monetary value
- Supports multiple denomination detection
- Audio feedback with detected amounts in dinars
- No data sent to external servers

### 📖 Image Text Reader (OCR)
- Optical Character Recognition for text in images
- Converts written text to speech
- Supports various text formats and languages
- Camera capture or image upload options

### 🔍 View Description
- AI-powered scene description
- Detailed audio descriptions of surroundings
- Helps users understand their environment
- Real-time image analysis and narration

### 🎤 Voice Features
- Google Text-to-Speech integration
- Multiple voice options and languages
- Clear audio feedback for all detections
- Fallback to browser speech synthesis

## Technology Stack

- **Frontend**: React with Vite
- **AI/ML**: TensorFlow.js, YOLOv8
- **Maps**: Google Maps API
- **Speech**: Google TTS API, Web Speech API
- **Camera**: WebRTC for real-time video processing

## Quick Start

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open in browser and allow camera/microphone permissions

## Accessibility

Designed specifically for visually impaired users with:
- Voice-first interface design
- Large, accessible buttons
- Comprehensive audio feedback
- Keyboard navigation support
- High contrast visual elements

---

*This application leverages cutting-edge AI technology to provide independence and confidence for users with visual impairments.*