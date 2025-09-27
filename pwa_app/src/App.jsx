import { useState } from "react";
import "./App.css";

// Component imports
import HomeScreen from "./components/HomeScreen.jsx";
import DirectionsScreen from "./components/DirectionsScreen.jsx";
import ViewDescriptionScreen from "./components/ViewDescriptionScreen.jsx";
import ImageTextReader from "./components/ImageTextReader.jsx";
import MoneyDetectionScreen from "./components/MoneyDetectionScreen.jsx";
import DoorDetectionScreen from "./components/DoorDetectionScreen.jsx"; // ✅ NEW

function App() {
  const [currentScreen, setCurrentScreen] = useState("home");

  const navigateToDirections = () => setCurrentScreen("directions");
  const navigateToHome = () => setCurrentScreen("home");
  const navigateToViewDescription = () => setCurrentScreen("viewDescription");
  const navigateToImageTextReader = () => setCurrentScreen("imageTextReader");
  const navigateToMoneyDetection = () => setCurrentScreen("moneyDetection");
  const navigateToDoorDetection = () => setCurrentScreen("doorDetection"); // ✅ NEW

  return (
    <div className="app">
      {currentScreen === "home" && (
        <HomeScreen
          onNavigateToDirections={navigateToDirections}
          onNavigateToViewDescription={navigateToViewDescription}
          onNavigateToImageTextReader={navigateToImageTextReader}
          onNavigateToMoneyDetection={navigateToMoneyDetection}
          onNavigateToDoorDetection={navigateToDoorDetection} // ✅ Pass to HomeScreen
        />
      )}

      {currentScreen === "directions" && (
        <DirectionsScreen onNavigateHome={navigateToHome} />
      )}

      {currentScreen === "viewDescription" && (
        <ViewDescriptionScreen onNavigateHome={navigateToHome} />
      )}

      {currentScreen === "imageTextReader" && (
        <ImageTextReader onNavigateHome={navigateToHome} />
      )}

      {currentScreen === "moneyDetection" && (
        <MoneyDetectionScreen onNavigateBack={navigateToHome} />
      )}

      {currentScreen === "doorDetection" && (
        <DoorDetectionScreen onNavigateBack={navigateToHome} /> // ✅ New screen
      )}
    </div>
  );
}

export default App;
