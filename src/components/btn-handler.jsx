import { useState, useRef } from "react";

const ButtonHandler = ({ imageRef, onNavigateBack }) => {
  const [streaming, setStreaming] = useState(null); // streaming state
  const inputImageRef = useRef(null); // image input reference

  // closing image
  const closeImage = () => {
    const url = imageRef.current.src;
    imageRef.current.src = "#"; // restore image source
    URL.revokeObjectURL(url); // revoke url

    setStreaming(null); // set streaming to null
    inputImageRef.current.value = ""; // reset input image
    imageRef.current.style.display = "none"; // hide image
  };

  return (
    <div className="btn-container">
      {/* Image Handler */}
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          const url = URL.createObjectURL(e.target.files[0]); // create blob url
          imageRef.current.src = url; // set image source
          imageRef.current.style.display = "block"; // show image
          setStreaming("image"); // set streaming to image
        }}
        ref={inputImageRef}
      />
      <button
        onClick={() => {
          // if not streaming
          if (streaming === null) inputImageRef.current.click();
          // closing image streaming
          else if (streaming === "image") closeImage();
        }}
      >
        {streaming === "image" ? "Close" : "Upload"} Image
      </button>

      {/* Back to Home Button */}
      {onNavigateBack && (
        <button
          onClick={onNavigateBack}
          style={{
            marginTop: "1rem",
            padding: "10px 15px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          ← Back to Home
        </button>
      )}
    </div>
  );
};

export default ButtonHandler;
