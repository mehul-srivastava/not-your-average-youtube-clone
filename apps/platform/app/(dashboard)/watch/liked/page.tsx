import React from "react";
import { HeartIcon } from "lucide-react";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import VideoItem from "@/components/video-item";
import { auth } from "@/auth";

const page = async () => {
  const session = await auth();
  if (!session) redirect("/auth/identity?redirectTo=/watch/liked");

  const data = await prisma.user.findFirst({
    where: {
      id: session.user?.id,
    },
    select: {
      ratings: {
        select: {
          video: {
            select: {
              id: true,
              title: true,
              thumbnail: true,
              createdAt: true,
              user: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
        where: {
          choice: "LIKE",
        },
      },
    },
  });

  return (
    <div className="p-10">
      <div className="flex items-center gap-4">
        <HeartIcon className="text-destructive" />
        <h2 className="text-xl">Liked Videos</h2>
      </div>
      <div className="mt-4 grid grid-cols-4 grid-rows-1 gap-4">
        {!data || !data.ratings || (data.ratings.length <= 0 && <p>You have not liked any videos yet!</p>)}
        {data &&
          data.ratings.length > 0 &&
          data.ratings.map(({ video }) => <VideoItem key={video.id} id={video.id} title={video.title} thumbnail={video.thumbnail} userName={video.user?.name!} createdAt={video.createdAt} />)}
      </div>
    </div>
  );
};

export default page;
