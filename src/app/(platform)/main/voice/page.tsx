"use client";
import { Button } from "@/app/_components/ui/button";
import { useEffect, useRef } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
const VoicePage = () => {
  const recorderControls = useAudioRecorder();
  const blockRef = useRef(null);

  useEffect(() => {
    if (!recorderControls.recordingBlob) return;
    console.log(recorderControls.recordingBlob);
    // recordingBlob will be present at this point after 'stopRecording' has been called
  }, [recorderControls.recordingBlob]);
  const addAudioElement = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    blockRef.current.appendChild(audio);
  };

  const handleSending = async () => {
    if (!recorderControls.recordingBlob) {
      console.log("no blob");
      return;
    }

    const formData = new FormData();
    formData.append("audio", recorderControls.recordingBlob, "recording.wav");

    const response = await fetch("http://localhost:3000/api/pr", {
      method: "POST",
      body: formData,
    });
    console.log(await response.json());
  };

  return (
    <div ref={blockRef}>
      <AudioRecorder
        onRecordingComplete={(blob) => addAudioElement(blob)}
        recorderControls={recorderControls}
      />
      <Button onClick={() => handleSending()}>Send</Button>
    </div>
  );
};

export default VoicePage;
