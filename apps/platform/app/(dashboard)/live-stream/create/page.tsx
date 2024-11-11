import React from "react";

import CreateLiveStreamForm from "./__components/create-live-stream-form";
import WebcamPreview from "./__components/webcam-preview";

const page = () => {
  return (
    <div className="p-10">
      <div className="flex gap-6">
        <WebcamPreview />
        <CreateLiveStreamForm />
      </div>
    </div>
  );
};

export default page;
