import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import Loader from "./loader";
import ButtonHandler from "./btn-handler";
import { detect } from "../utils/detect";
import "../style/App.css";

// Import your speech utility
import { speakTextWithGoogleTTS } from "../utils/speechUtils";

const MoneyDetectionScreen = ({ onNavigateBack }) => {
  const [loading, setLoading] = useState({ loading: true, progress: 0 });
  const [model, setModel] = useState({
    net: null,
    inputShape: [1, 0, 0, 3],
  });

  const [totalAmount, setTotalAmount] = useState(null);

  const imageRef = useRef(null);
  const canvasRef = useRef(null);

  const modelName = "money";

  useEffect(() => {
    tf.ready().then(async () => {
      try {
        const yolov8 = await tf.loadGraphModel(
          `${window.location.href}/${modelName}_web_model/model.json`,
          {
            onProgress: (fractions) => {
              setLoading({ loading: true, progress: fractions });
            },
          }
        );

        const dummyInput = tf.ones(yolov8.inputs[0].shape);
        const warmupResults = yolov8.execute(dummyInput);

        setLoading({ loading: false, progress: 1 });
        setModel({
          net: yolov8,
          inputShape: yolov8.inputs[0].shape,
        });

        tf.dispose([warmupResults, dummyInput]);
      } catch (error) {
        console.error("Error loading model:", error);
        setLoading({ loading: false, progress: 0 });
      }
    });
  }, []);

  const handleImageLoad = async () => {
    if (imageRef.current && model.net) {
      console.log("Starting detection...");
      const amount = await detect(imageRef.current, model, canvasRef.current);
      console.log("Detected amount:", amount);
      setTotalAmount(amount);

      const speechText =
        amount !== null && amount !== 0
          ? `${amount} dinars`
          : "No money detected in the image";

      console.log("Speaking text:", speechText);

      try {
        await speakTextWithGoogleTTS(speechText);
        console.log("Speech finished");
      } catch (error) {
        console.error("Google TTS failed, falling back to speechSynthesis:", error);
        if ("speechSynthesis" in window) {
          const utterance = new SpeechSynthesisUtterance(speechText);
          window.speechSynthesis.speak(utterance);
        }
      }
    }
  };

  return (
    <div className="App">
      {loading.loading && (
        <Loader>
          Loading model... {(loading.progress * 100).toFixed(2)}%
        </Loader>
      )}

      <div className="header">
        <h1>Money Detection App</h1>
        <p>
          Money detection application on browser powered by{" "}
          <code>tensorflow.js</code>
        </p>
        <p>
          Serving : <code className="code">{modelName}</code>
        </p>
      </div>

      <div className="content">
        <img
          src="#" // Replace this with your actual image source or hook to upload
          ref={imageRef}
          onLoad={handleImageLoad}
          alt="Money to detect"
        />
        <canvas
          width={model.inputShape[1]}
          height={model.inputShape[2]}
          ref={canvasRef}
        />
      </div>

      {totalAmount !== null && (
        <div className="total-amount">
          <h2>{totalAmount} dinars</h2>
        </div>
      )}

      <ButtonHandler imageRef={imageRef} onNavigateBack={onNavigateBack} />
    </div>
  );
};

export default MoneyDetectionScreen;
