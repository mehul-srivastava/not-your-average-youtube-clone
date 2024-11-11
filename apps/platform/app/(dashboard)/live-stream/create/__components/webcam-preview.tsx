"use client";

import React from "react";
import useWebcam from "@/hooks/useWebcam";

const WebcamPreview = () => {
  const { videoRef } = useWebcam();
  return (
    <div className="relative w-full rounded-md">
      <span className="absolute rounded-tl-[inherit] bg-gray-800 p-2">Preview</span>
      <video ref={videoRef} autoPlay className="h-full w-full rounded-[inherit] bg-black" />
    </div>
  );
};

export default WebcamPreview;
