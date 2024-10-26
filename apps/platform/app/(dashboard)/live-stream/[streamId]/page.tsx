import React from "react";

import prisma from "@/lib/prisma";
import VideoPlayer from "@/components/video-player";
import LiveChat from "./__components/live-chat";

interface IPageProps {
  params: { streamId: string };
}

const page = async ({ params }: IPageProps) => {
  const rtmpServer =
    process.env.NODE_ENV === "production"
      ? "https://rtmp.youtube.mehuls.in"
      : "http://localhost:7123";

  const data = await prisma.liveStream.findFirst({
    select: {
      rtmpSecretKey: true,
    },
    where: {
      id: params.streamId,
    },
  });

  const rtmpSecretKey = data?.rtmpSecretKey;

  return (
    <div className="flex flex-col gap-4 p-10 lg:flex-row">
      <div className="h-full w-full rounded-md lg:w-9/12">
        <VideoPlayer
          m3u8Url={`${rtmpServer}/live/${rtmpSecretKey}/index.m3u8`}
          isLive={true}
        />
      </div>
      <div className="relative h-96 w-full rounded-md bg-black/40 p-2 lg:h-auto lg:w-3/12">
        <LiveChat />
      </div>
    </div>
  );
};

export default page;
