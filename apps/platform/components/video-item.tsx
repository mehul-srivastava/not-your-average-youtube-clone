import React from "react";
import { CheckIcon, EyeIcon } from "lucide-react";
import Link from "next/link";

import redis from "@/lib/redis";
import { VideoType } from "@/types";
import { displayStandardCount, formatTitle, pluralOrSingular, timeAgo } from "@/utils";

type IVideoItem = Omit<VideoType, "description" | "manifestFile" | "userId" | "updatedAt" | "viewCount"> & { userName: string };

const VideoItem = async ({ id, title, thumbnail, userName, createdAt }: IVideoItem) => {
  const key = "video:".concat(id);
  const views = parseInt((await redis.get(key))!);
  // TODO: change it to same as watch page - extract a helper function out

  return (
    <Link className="rounded-md p-2 transition-all duration-200 hover:bg-black" href={"/watch?v=".concat(id)}>
      <div className="relative h-48 w-full rounded-sm bg-cover" style={{ backgroundImage: `url(${thumbnail})` }} />

      <div className="mt-3 flex items-center justify-between">
        <p className="flex items-center gap-2 text-sm text-gray-500">
          <EyeIcon className="text-destructive h-4 w-4" />
          <span>
            {displayStandardCount(views)} {pluralOrSingular("view", views)}
          </span>
        </p>
        <p className="text-sm text-gray-500">{timeAgo(createdAt)}</p>
      </div>

      <h3 className="mt-2 font-normal">{formatTitle(title)}</h3>
      <small className="flex items-center gap-2 text-base font-normal text-gray-500">
        {userName} <CheckIcon className="h-3 w-3 text-emerald-500" />
      </small>
    </Link>
  );
};

export default VideoItem;
