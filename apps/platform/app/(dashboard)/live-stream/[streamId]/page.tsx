import React from "react";

import VideoPlayer from "@/components/video-player";
import LiveChatContainer from "./__components/live-chat-container";
import LiveChatHeader from "./__components/live-chat-header";
import LiveChatInput from "./__components/live-chat-input";

interface IPageProps {
  params: { streamId: string };
}

const page = ({ params }: IPageProps) => {
  return (
    <div className="flex flex-col gap-4 p-10 lg:flex-row">
      <div className="h-full w-full rounded-md lg:w-9/12">
        <VideoPlayer
          m3u8Url={`http://localhost:7123/live/${params.streamId}/index.m3u8`}
          isLive={true}
        />
      </div>
      <div className="relative h-96 w-full rounded-md bg-black/40 p-2 lg:h-auto lg:w-3/12">
        <div className="absolute left-0 top-0 w-full">
          <LiveChatHeader />
        </div>
        <div className="absolute inset-0 overflow-y-auto px-6 py-4 lg:block">
          <LiveChatContainer />
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <LiveChatInput />
        </div>
      </div>
    </div>
  );
};

export default page;
