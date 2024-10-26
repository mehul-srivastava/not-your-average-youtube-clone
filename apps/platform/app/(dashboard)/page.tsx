import React from "react";
import { FlameIcon, RadioIcon } from "lucide-react";

import prisma from "@/lib/prisma";
import LiveStreamItem from "./__components/live-stream-item";
import VideoItem from "./__components/video-item";

const page = async () => {
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
      title: true, // get user responsible from here using 1-M relation
      createdAt: true,
    },
    where: {
      isFinished: false,
    },
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
  });

  // TODO: for now, take only 5 live streams. later figure out how to paginate these (maybe need to turn this into an API and then cursorify it)

  return (
    <div>
      <div className="flex items-center gap-4">
        <RadioIcon className="text-destructive" />
        <h2 className="text-xl">Discover Live</h2>
      </div>
      <div className="mt-4 grid w-full grid-cols-3 gap-4">
        {liveStreams.length <= 0 && "No creator is streaming right now!"}

        {liveStreams.length > 0 &&
          liveStreams.map((item) => (
            <LiveStreamItem
              key={item.id}
              id={item.id}
              title={item.title}
              createdAt={item.createdAt}
              user={"user"}
            />
          ))}
      </div>
    </div>
  );
};

const HomeFeedSection = () => {
  return (
    <div>
      <div className="flex items-center gap-4 gap-y-6">
        <FlameIcon className="text-destructive" />
        <h2 className="text-xl">Trending Videos</h2>
      </div>
      <div className="mt-4 grid w-full grid-cols-5 gap-4">
        {Array.from(new Array(12)).map((item) => (
          <VideoItem key={Math.random()} />
        ))}
      </div>
    </div>
  );
};

export default page;
