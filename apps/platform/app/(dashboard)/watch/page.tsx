import React from "react";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import VideoPlayer from "@/components/video-player";
import VideoMetadata from "./__components/video-section/metadata";
import Comments from "./__components/comment-section/comments";
import Recommendations from "./__components/recommendation-section/recommendations";

interface IPageProps {
  searchParams: {
    v: string;
  };
}

const page = async ({ searchParams }: IPageProps) => {
  if (!searchParams.v) redirect("/");

  const video = await prisma.video.findFirst({
    where: {
      id: searchParams.v,
    },
    select: {
      id: true,
      manifestFile: true,
      title: true,
      description: true,
      viewCount: true,
      thumbnail: true,
      updatedAt: true,
      user: {
        select: {
          id: true,
          name: true,
          imageUrl: true,
          _count: {
            select: {
              subscribers: true,
            },
          },
        },
      },
      ratings: {
        select: {
          choice: true,
        },
        where: {
          OR: [{ choice: "LIKE" }, { choice: "DISLIKE" }],
        },
      },
    },
  });

  if (!video) redirect("/");

  const { likeCount, dislikeCount } = video.ratings.reduce(
    (state, curr) => {
      if (curr.choice === "LIKE") ++state.likeCount;
      if (curr.choice === "DISLIKE") ++state.dislikeCount;
      return state;
    },
    { likeCount: 0, dislikeCount: 0 },
  );

  return (
    <div className="flex gap-4 p-10">
      <div className="flex w-9/12 flex-col gap-4">
        <VideoPlayer m3u8Url={video.manifestFile} isLive={false} poster={video.thumbnail ?? ""} />
        <VideoMetadata
          id={video.id}
          title={video.title}
          description={video.description}
          viewCount={video.viewCount}
          updatedAt={video.updatedAt}
          userId={video.user.id}
          userName={video.user.name}
          userImage={video.user.imageUrl}
          subscribersCount={video.user._count.subscribers}
          likeCount={likeCount}
          dislikeCount={dislikeCount}
        />
        <Comments videoId={video.id} />
      </div>
      <div className="flex w-3/12 flex-col gap-4">
        <Recommendations searchParams={searchParams} />
      </div>
    </div>
  );
};

export default page;
