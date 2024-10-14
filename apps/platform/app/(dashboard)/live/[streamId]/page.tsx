import React from "react";

import VideoPlayer from "@/components/video-player";
import LiveChat from "./__components/live-chat";

const page = () => {
  return (
    <div className="bg-red flex h-full gap-4 p-10">
      <div className="h-[800px] w-9/12 rounded-md">
        {/* Video Player */}
        <VideoPlayer
          m3u8Url="https://assets7.ign.com/master/videos/zencoder/2019/06/11/,640/d3e7aa2687f580e185c47f9288ccd139-347000,853/d3e7aa2687f580e185c47f9288ccd139-724000,960/d3e7aa2687f580e185c47f9288ccd139-1129000,1280/d3e7aa2687f580e185c47f9288ccd139-1910000,1920/d3e7aa2687f580e185c47f9288ccd139-3906000,-1560300082/master.m3u8"
          isLive={true}
        />
      </div>

      {/* Live Chat Area */}
      <div className="relative max-h-[800px] w-3/12 rounded-md bg-black/40 p-5">
        <LiveChat />
      </div>
    </div>
  );
};

export default page;
