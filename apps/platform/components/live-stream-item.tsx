import React from "react";
import Link from "next/link";
import { CheckIcon, CircleAlertIcon, UsersRoundIcon } from "lucide-react";

import redis from "@/lib/redis";
import { LiveStreamType } from "@/types";
import { displayStandardCount, timeAgo } from "@/utils";

type ILiveStreamItem = Omit<LiveStreamType, "rtmpSecretKey" | "description" | "userId" | "isFinished"> & { userImageUrl?: string; userName?: string; isFinished?: boolean };

const LiveStreamItem = async ({ id, title, thumbnail, createdAt, userImageUrl, userName, isFinished }: ILiveStreamItem) => {
  const thumbnailImage = !!thumbnail ? thumbnail : "/anonymous-live-stream-thumbnail-img.jpg"; // Can use getRandomLiveStreamPlaceholder() here
  const userImage = !!userImageUrl ? userImageUrl : "/anonymous-live-stream-profile-img.png";

  const key = "live:".concat(id);
  const watching = parseInt((await redis.get(key))!);

  return (
    <Link className="relative rounded-md p-2 transition-all duration-200 hover:bg-black" href={"/live-stream/".concat(id)}>
      {/* User and Thumbnail Images */}
      <div className="relative h-48 w-full rounded-sm bg-cover bg-center" style={{ backgroundImage: `url(${thumbnailImage})` }}>
        <div className="absolute bottom-4 left-4 h-8 w-8 rounded-full bg-white bg-cover shadow-md" style={{ backgroundImage: `url(${userImage})` }}></div>
      </div>

      {isFinished && <span className="absolute right-0 top-0 m-2 rounded-bl-md bg-black px-4 py-2 text-xs">Ended</span>}

      {/* Stream Metadata */}
      <div className="mt-3 flex items-center justify-between">
        <p className="flex items-center gap-2 text-sm text-gray-500">
          <UsersRoundIcon className="text-destructive h-4 w-4" />
          <span>{displayStandardCount(watching)} watching</span>
        </p>
        <p className="text-sm text-gray-500">{timeAgo(createdAt)}</p>
      </div>

      <h3 className="mt-2 text-lg">{title}</h3>

      {/* Creator Metadata */}
      <small className="flex items-center gap-2 text-sm text-gray-500">
        <p>{!userName ? "Unverified User" : userName}</p>
        {!userName ? <CircleAlertIcon className="h-3 w-3 text-yellow-500" /> : <CheckIcon className="h-3 w-3 text-emerald-500" />}
      </small>
    </Link>
  );
};

export default LiveStreamItem;
