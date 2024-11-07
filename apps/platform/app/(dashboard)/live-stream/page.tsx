import React from "react";
import { RadioIcon } from "lucide-react";

import LiveStreamItem from "@/components/live-stream-item";
import prisma from "@/lib/prisma";

const page = async () => {
  const liveStreams = await prisma.liveStream.findMany({
    select: {
      id: true,
      title: true,
      thumbnail: true,
      isFinished: true,
      user: {
        select: {
          imageUrl: true,
          name: true,
        },
      },
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-10">
      <div className="flex items-center gap-4">
        <RadioIcon className="text-destructive" />
        <h2 className="text-xl">Live Streams</h2>
      </div>
      <div className="mt-4 grid grid-cols-4 grid-rows-1 gap-4">
        {liveStreams.map((item) => (
          <LiveStreamItem
            key={item.id}
            id={item.id}
            title={item.title}
            thumbnail={item.thumbnail}
            userImageUrl={item.user?.imageUrl}
            userName={item.user?.name}
            createdAt={item.createdAt}
            isFinished={item.isFinished}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
