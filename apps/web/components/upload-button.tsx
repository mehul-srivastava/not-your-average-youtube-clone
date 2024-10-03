"use client";

import axios from "axios";
import React, { useRef } from "react";

const UploadButton = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function handleButtonClick() {
    fileInputRef.current?.click();
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      const file = e.target.files?.[0];

      if (!file) return;
      if (file.type !== "video/mp4") return;

      const response = await axios.post("/api/get-presigned-url", {
        filename: file.name,
      });

      await axios.put(response.data.url, file);

      alert("video uploaded");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <button onClick={handleButtonClick}>Upload</button>
      <input
        type="file"
        accept=".mp4"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleUpload}
      />
    </div>
  );
};

export default UploadButton;
