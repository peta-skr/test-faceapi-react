import * as faceapi from "face-api.js";
import { useEffect, useRef } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 720,
  height: 360,
  facingMode: "user",
};

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef();

  useEffect(() => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    ])
      .then(console.log("done"))
      .catch((e) => console.log(e));
  }, []);

  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(webcamRef, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();
    console.log(detections);
  }, 1000);

  return (
    <div className="App">
      <Webcam
        audio={false}
        width={540}
        height={360}
        ref={webcamRef}
        videoConstraints={videoConstraints}
      />
    </div>
  );
}

export default App;
