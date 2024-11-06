import React from "react";

import { auth } from "@/auth";
import { VideoType } from "@/types";
import redis from "@/lib/redis";
import prisma from "@/lib/prisma";
import {
  displayLongCount,
  displayStandardCount,
  pluralOrSingular,
} from "@/utils";
import SubscribeButton from "./subscribe-button";
import LikeDislikeButton from "./like-dislike-button";

type IComponentProps = Omit<
  VideoType,
  "manifestFile" | "thumbnail" | "updatedAt" | "userId"
> & {
  userName: string;
  userImage: string;
  userId: string;
  subscribersCount: number;
  likeCount: number;
  dislikeCount: number;
};

const VideoMetadata = async ({
  id,
  title,
  description,
  userId,
  userName,
  userImage,
  subscribersCount,
  likeCount,
  dislikeCount,
}: IComponentProps) => {
  const session = await auth();

  const key = "video:".concat(id);
  const views = parseInt((await redis.get(key))!);

  return (
    <div>
      {/* Video Metadata */}
      <div className="mt-2 flex w-full items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">{title}</h2>
          <p className="text-xl font-normal text-gray-500">
            {displayLongCount(views)} {pluralOrSingular("view", views)}
          </p>
        </div>
        <div>
          <ActionButtonGroup
            videoId={id}
            userId={userId}
            likeCount={likeCount}
            dislikeCount={dislikeCount}
          />
        </div>
      </div>

      {/* Channel Metadata */}
      <div className="mt-6 flex items-center gap-2">
        <div
          className="h-10 w-10 rounded-full bg-cover"
          style={{ backgroundImage: `url("${userImage}")` }}
        ></div>
        <div>
          <h3 className="text-lg">
            {userName} {session?.user?.id === userId && "(You)"}
          </h3>
          <h4 className="text-sm font-thin text-gray-500">
            {displayStandardCount(subscribersCount || 0)}{" "}
            {pluralOrSingular("subscriber", subscribersCount)}
          </h4>
        </div>
      </div>
      <p className="mt-2 text-gray-300">{description}</p>
    </div>
  );
};

interface ISubComponentProps {
  videoId: string;
  userId: string;
  likeCount: number;
  dislikeCount: number;
}

const ActionButtonGroup = async ({
  videoId,
  userId,
  likeCount,
  dislikeCount,
}: ISubComponentProps) => {
  const session = await auth();

  const data = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      subscribers: {
        where: {
          id: session?.user?.id,
        },
      },
      videos: {
        where: {
          id: videoId,
        },
        select: {
          ratings: {
            where: {
              userId: session?.user?.id,
            },
          },
        },
      },
    },
  });

  console.log();

  return (
    <div className="flex items-center justify-end gap-2">
      <LikeDislikeButton
        videoId={videoId}
        likeCount={likeCount}
        dislikeCount={dislikeCount}
        currentUserHasLiked={data?.videos[0]?.ratings[0]?.choice}
      />
      <SubscribeButton
        currentUserIsSubscriber={!data || data.subscribers.length > 0}
        userId={userId}
        videoId={videoId}
      />
    </div>
  );
};

export default VideoMetadata;
