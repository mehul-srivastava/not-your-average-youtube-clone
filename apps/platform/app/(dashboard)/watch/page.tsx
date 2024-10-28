import React from "react";

import VideoPlayer from "@/components/video-player-old";
import RecommendVideoItem from "./__components/recommended-video-item";
import VideoMetadata from "./__components/video-metadata";
import CommentSection from "./__components/comment-section";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";

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
      thumbnail: true,
      createdAt: true,
      ratings: {
        select: {
          likes: true,
          dislikes: true,
        },
      },
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
    },
  });

  const otherVideos = await prisma.video.findMany({
    where: {
      id: {
        not: searchParams.v,
      },
    },
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
  });

  return (
    <div className="flex gap-4 p-10">
      <div className="flex w-9/12 flex-col gap-4">
        <VideoPlayer
          m3u8Url={video?.manifestFile!}
          isLive={false}
          poster={video?.thumbnail!}
        />
        <VideoMetadata
          id={video?.id!}
          title={video?.title!}
          description={video?.description!}
          userId={video?.user.id!}
          userName={video?.user.name!}
          userImage={video?.user.imageUrl!}
          createdAt={video?.createdAt!}
          subscribersCount={video?.user._count.subscribers!}
          likeCount={video?.ratings?.likes!}
          dislikeCount={video?.ratings?.dislikes!}
        />
        <CommentSection videoId={video?.id!} />
      </div>
      <div className="flex w-3/12 flex-col gap-4">
        {otherVideos.map((item) => (
          <RecommendVideoItem
            key={item.id}
            id={item.id}
            title={item.title}
            thumbnail={item.thumbnail}
            userName={item.user.name}
            createdAt={item.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
