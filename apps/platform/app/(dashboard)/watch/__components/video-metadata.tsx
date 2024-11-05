import React from "react";

import { auth } from "@/auth";
import { VideoType } from "@/types";
import { displaySubsCount } from "@/utils";
import SubscribeButton from "./subscribe-button";
import LikeDislikeButton from "./like-dislike-button";

type IVideoMetadata = Omit<
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
}: IVideoMetadata) => {
  const session = await auth();
  return (
    <div>
      {/* Video Metadata */}
      <div className="mt-2 flex w-full items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">
            {/* Only 100 chars allowed */}
            {title}
          </h2>
          <p className="text-xl font-normal text-gray-500">604,929,123 views</p>{" "}
          {/* TODO: fetch from redis */}
        </div>
        <div>
          <div className="flex items-center justify-end gap-2">
            <LikeDislikeButton
              videoId={id}
              likeCount={likeCount}
              dislikeCount={dislikeCount}
            />
            <SubscribeButton userId={userId} videoId={id} />
          </div>
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
            {displaySubsCount(subscribersCount || 0)}{" "}
            {subscribersCount === 1 ? "subscriber" : "subscribers"}
          </h4>
        </div>
      </div>
      <p className="mt-2 text-gray-300">
        {/* 300 chars only allowed */}
        {description}
      </p>
    </div>
  );
};

export default VideoMetadata;
