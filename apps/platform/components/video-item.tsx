import React from "react";
import { CheckIcon, EyeIcon } from "lucide-react";
import Link from "next/link";

import { VideoType } from "@/types";
import { displayStandardCount, formatTitle, pluralOrSingular, timeAgo } from "@/utils";
import { cn } from "@repo/shadcn/lib/utils";

type IVideoItem = Omit<VideoType, "description" | "manifestFile" | "userId" | "updatedAt"> & { userName: string };

const VideoItem = async ({ id, title, thumbnail, viewCount, isReady, userName, createdAt }: IVideoItem) => {
  // TODO: change it to same as watch page - extract a helper function out
  // const key = "video:".concat(id);
  // const views = parseInt((await redis.get(key))!);

  return (
    <Link
      className={cn(
        "cursor-default rounded-md p-2 transition-all duration-200",
        isReady && "cursor-pointer hover:bg-black",
        !isReady && "select-none",
      )}
      href={isReady ? "/watch?v=".concat(id) : "#"}
    >
      <div className={!isReady ? "opacity-30" : undefined}>
        <div className="relative h-48 w-full rounded-sm bg-cover" style={{ backgroundImage: `url(${thumbnail})` }} />

        <div className="mt-3 flex items-center justify-between">
          <p className="flex items-center gap-2 text-sm text-gray-500">
            <EyeIcon className="text-destructive h-4 w-4" />
            <span>
              {displayStandardCount(viewCount)} {pluralOrSingular("view", viewCount)}
            </span>
          </p>
          <p className="text-sm text-gray-500">{timeAgo(createdAt)}</p>
        </div>

        <h3 className="mt-2 font-normal">{formatTitle(title)}</h3>
        <small className="flex items-center gap-2 text-base font-normal text-gray-500">
          {userName} <CheckIcon className="h-3 w-3 text-emerald-500" />
        </small>
      </div>
    </Link>
  );
};

export default VideoItem;
