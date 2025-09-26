# Walking Directions Test - Project Structure

This document outlines the complete file structure of the AI Sight Walking Directions application.

## Project Root
```
/
│
├── 📁 public/                          # Static assets served by Vite
│   └── 📄 vite.svg                     # Vite logo (default asset)
│
├── 📁 server/                          # Backend server for TTS functionality
│   ├── 📄 index.js                     # Express server for Google TTS
│   ├── 📄 package.json                 # Server dependencies
│   ├── 📄 package-lock.json            # Server dependency lock file
│   └── 📄 service_account.json         # Google Cloud service account credentials
│
├── 📁 src/                             # Main React application source code
│   ├── 📁 assets/                      # Static assets for React components
│   │   └── 📄 react.svg                # React logo (default asset)
│   │
│   ├── 📁 components/                  # React components
│   │   ├── 📄 HomeScreen.jsx           # Home screen with navigation button
│   │   └── 📄 DirectionsScreen.jsx     # Directions input and voice functionality
        └── 📄 ViewDescriptionScreen.jsx # Image analysis and description component
│   │
│   ├── 📁 utils/                       # Utility functions
│   │   └── 📄 speechUtils.js           # Gemini AI and Google TTS functions
│   │
│   ├── 📄 App.jsx                      # Main App component (navigation logic)
│   ├── 📄 App.css                      # Component-specific styles (dark theme)
│   ├── 📄 index.css                    # Global styles and reset
│   └── 📄 main.jsx                     # React app entry point
│
├── 📄 .env                             # Environment variables (API keys)
├── 📄 .gitignore                       # Git ignore rules
├── 📄 index.html                       # Main HTML template with Google Maps API
├── 📄 package.json                     # Frontend dependencies and scripts
├── 📄 package-lock.json                # Frontend dependency lock file
├── 📄 vite.config.js                   # Vite build tool configuration
├── 📄 eslint.config.js                 # ESLint linting configuration
├── 📄 README.md                        # Project documentation
└── 📄 PROJECT_STRUCTURE.md             # This file - project structure documentation
```

## File Descriptions

### Frontend Application (`/src`)

#### **Main Application Files**
- **`main.jsx`** - Entry point that renders the React app into the DOM
- **`App.jsx`** - Main component handling navigation between home and directions screens
- **`App.css`** - Dark theme styles for all components
- **`index.css`** - Global CSS reset and accessibility styles

#### **Assets (`/src/assets`)**
- **`react.svg`** - React logo (default Vite asset)

#### **Components (`/src/components`)**
- **`HomeScreen.jsx`** - Simple home screen with "Walking Directions" button
- **`DirectionsScreen.jsx`** - Main functionality screen with:
  - Location input forms (From/To)
  - Get Directions button
  - Voice input functionality
  - Google Maps integration
  - Walking directions processing
- **`ViewDescriptionScreen.jsx`** - Image analysis component with:
  - File upload for image selection
  - Gemini AI integration for image description
  - Accessibility-focused image analysis for blind users

#### **Utils (`/src/utils`)**
- **`speechUtils.js`** - Utility functions for:
  - Gemini AI API integration for direction enhancement
  - Google TTS (Text-to-Speech) functionality
- **`googleMapsLoader.js`** - Dynamic Google Maps API loader:
  - Loads Google Maps script from environment variables
  - Handles API key security
  - Provides loading state management

### Static Assets (`/public`)
- **`vite.svg`** - Vite logo (default build tool asset)

### Backend Server (`/server`)
- **`index.js`** - Express server providing Google TTS API endpoint
- **`package.json`** - Server dependencies (Express, Google TTS, etc.)
- **`service_account.json`** - Google Cloud credentials for TTS service

### Configuration Files
- **`.env`** - Environment variables (contains API keys like VITE_GEMINI_API_KEY, GOOGLE_CLOUD_API_KEY)
- **`.gitignore`** - Git ignore rules (excludes node_modules, .env, etc.)
- **`package.json`** - Frontend dependencies (React 19, Vite 7, ESLint)
- **`vite.config.js`** - Vite build configuration for React
- **`eslint.config.js`** - Code quality and linting rules
- **`index.html`** - HTML template (Google Maps now loaded dynamically)

### Documentation
- **`README.md`** - Project setup and usage instructions
- **`PROJECT_STRUCTURE.md`** - This file documenting the project structure

## Technology Stack

### Frontend
- **React 19.1.1** - UI framework
- **Vite 7.1.7** - Build tool and dev server
- **ESLint 9.36.0** - Code linting
- **CSS3** - Dark theme styling
- **Google Maps JavaScript API** - Directions and mapping

### Backend
- **Node.js + Express** - TTS server
- **Google Cloud Text-to-Speech** - Voice synthesis

### AI Integration
- **Google Gemini 1.5 Flash** - Direction enhancement
- **Web Speech API** - Voice input recognition

## Key Features
- 🌙 **Dark Theme** - Accessibility-focused dark UI
- 🎤 **Voice Input** - Speech recognition for route input
- 🔊 **Audio Directions** - Text-to-speech for directions
- 🤖 **AI Enhancement** - Gemini AI improves direction clarity
- ♿ **Accessibility** - Designed for blind and visually impaired users
- 📱 **Responsive** - Works on mobile and desktop

## Development Commands
- `npm run dev` - Start development server (frontend)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Server Commands (from `/server` directory)
- `npm start` - Start TTS server on port 5001

---
*Generated for AI Sight Walking Directions Project*