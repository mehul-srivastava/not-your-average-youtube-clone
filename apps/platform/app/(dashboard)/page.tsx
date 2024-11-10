import React from "react";
import { FlameIcon, RadioIcon } from "lucide-react";

import prisma from "@/lib/prisma";
import LiveStreamItem from "@/components/live-stream-item";
import VideoItem from "@/components/video-item";
import { $Enums } from "@prisma/client";
import { auth } from "@/auth";

const page = () => {
  return (
    <div className="flex flex-col gap-10 p-10">
      <LiveStreamSection />
      <HomeFeedSection />
    </div>
  );
};

const LiveStreamSection = async () => {
  const liveStreams = await prisma.liveStream.findMany({
    select: {
      id: true,
      title: true,
      thumbnail: true,
      user: {
        select: {
          imageUrl: true,
          name: true,
        },
      },
      createdAt: true,
    },
    where: {
      isFinished: $Enums.Status.RUNNING,
    },
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <div className="flex items-center gap-4">
        <RadioIcon className="text-destructive" />
        <h2 className="text-xl">Discover Live</h2>
      </div>
      <div className="mt-4 grid grid-cols-3 grid-rows-1 gap-4">
        {liveStreams.length <= 0 && <span className="text-gray-500">No creator is streaming right now!</span>}

        {liveStreams.length > 0 &&
          liveStreams.map((item) => (
            <LiveStreamItem
              key={item.id}
              id={item.id}
              title={item.title}
              thumbnail={item.thumbnail}
              userImageUrl={item.user?.imageUrl}
              userName={item.user?.name}
              createdAt={item.createdAt}
            />
          ))}
      </div>
    </div>
  );
};

const HomeFeedSection = async () => {
  const session = await auth();
  const videos = await prisma.video.findMany({
    select: {
      id: true,
      title: true,
      thumbnail: true,
      viewCount: true,
      isReady: true,
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      createdAt: true,
    },
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <div className="flex items-center gap-4 gap-y-6">
        <FlameIcon className="text-destructive" />
        <h2 className="text-xl">Explore Videos</h2>
      </div>
      <div className="mt-4 grid w-full grid-cols-5 gap-4">
        {videos.length <= 0 && "No video has been published as of now. You can be the first one!"}

        {videos.length > 0 &&
          videos.map((item) => {
            if (item.isReady || (!item.isReady && session?.user?.id === item.user.id)) {
              return (
                <VideoItem
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  viewCount={item.viewCount}
                  isReady={item.isReady}
                  thumbnail={item.thumbnail}
                  userName={item.user?.name}
                  createdAt={item.createdAt}
                />
              );
            }
          })}
      </div>
    </div>
  );
};

export default page;
