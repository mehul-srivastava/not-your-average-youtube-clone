"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

import { Button } from "@repo/shadcn/components/ui/button";
import { Input } from "@repo/shadcn/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@repo/shadcn/components/ui/dialog";
import { CircleHelpIcon } from "lucide-react";

const UploadButton = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [metadata, setMetadata] = useState({
    title: "",
    description: "",
    thumbnail: "",
  });
  const [file, setFile] = useState<File | undefined>();
  const router = useRouter();

  function handleButtonClick() {
    if (!isLoggedIn) {
      toast.error("You need to verify yourself first!");
      router.push("/auth/identity?redirectTo=/");
      return;
    }

    setIsModalOpen(true);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMetadata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleUpload() {
    try {
      if (!metadata.title) {
        toast.error("Please enter a title!");
        return;
      }
      if (!metadata.description) {
        toast.error("Please enter a description!");
        return;
      }
      if (!metadata.thumbnail) {
        toast.error("Please enter a thumbnail!");
        return;
      }
      if (!file) {
        toast.error("Please upload a file!");
        return;
      }
      if (file.type !== "video/mp4") {
        toast.error("Please upload a file in .mp4 format only");
        return;
      }
      if (file.size > 50 * 1000000) {
        toast.error("Please upload a file less than 50MB");
        return;
      }

      // TODO: this way is highly unscalable - put event in sqs, an upload-sweeper gets event from sqs and updates the database
      // TODO: also replace all localhost url - do this by making a centralised axios instance in lib/
      const response = await axios.post("/api/get-presigned-url", {
        filename: file.name,
        title: metadata.title,
        description: metadata.description,
        thumbnail: metadata.thumbnail,
      });

      // TODO: remove below comment
      await axios.put(response.data.url, file);

      setIsModalOpen(false);

      alert("Your video is being transcoded, should appear on the page in about a minute considering the limit on the file size!");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <Dialog defaultOpen={isModalOpen} open={isModalOpen} onOpenChange={() => setIsModalOpen((p) => !p)}>
        <Button onClick={handleButtonClick} variant="secondary" size="sm" className="text-xs">
          Upload
        </Button>
        <DialogContent className="bg-brand">
          <DialogHeader>
            <DialogTitle className="text-2xl">Upload Video</DialogTitle>
            <DialogDescription className="my-4 flex flex-col gap-2">
              <Input value={metadata.title} name="title" onChange={handleChange} placeholder="Title" />
              <Input value={metadata.description} name="description" onChange={handleChange} placeholder="Description" />
              <div className="relative">
                <Input value={metadata.thumbnail} name="thumbnail" onChange={handleChange} placeholder="Thumbnail URL" />
                <a
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  target="_blank"
                  href="https://www.google.com/search?q=freecodecamp+youtube+thumbnail+images&udm=2"
                >
                  <CircleHelpIcon className="h-4 cursor-pointer" />
                </a>
              </div>
              <Input type="file" accept=".mp4" onChange={(e) => (e.target.files ? setFile(e.target.files[0]) : setFile(undefined))} />
              <span className="mt-2">
                This action cannot be undone. This will permanently delete your account and remove your data from our servers.
              </span>

              <Button size={"sm"} className="mt-2" onClick={handleUpload}>
                Upload
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* <input type="file" accept=".mp4" style={{ display: "none" }} onChange={handleUpload} /> */}
    </div>
  );
};

export default UploadButton;
