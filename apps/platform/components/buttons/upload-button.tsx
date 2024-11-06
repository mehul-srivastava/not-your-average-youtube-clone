"use client";

import React, { useRef } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

import { Button } from "@repo/shadcn/components/ui/button";

const UploadButton = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  function handleButtonClick() {
    if (!isLoggedIn) {
      toast.error("You need to verify yourself first!");
      router.push("/auth/identity?redirectTo=/");
      return;
    }
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
      <Button
        onClick={handleButtonClick}
        variant="secondary"
        size="sm"
        className="text-xs"
      >
        Upload
      </Button>
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
