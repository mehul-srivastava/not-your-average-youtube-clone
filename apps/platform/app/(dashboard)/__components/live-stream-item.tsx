import React from "react";
import { CheckIcon, UsersRoundIcon } from "lucide-react";
import Link from "next/link";

import { LiveStreamType } from "@/types";
import { timeAgo } from "@/utils";

type ILiveStreamItem = Omit<
  LiveStreamType,
  "rtmpSecretKey" | "description" | "isFinished" | "userId"
> & { userImageUrl: string | undefined; userName: string | undefined };

const LiveStreamItem = ({
  id,
  title,
  thumbnail,
  createdAt,
  userImageUrl,
  userName,
}: ILiveStreamItem) => {
  const imageA = !!thumbnail ? thumbnail : "/live-stream-default-thumbnail.jpg";

  const imageB = !!userImageUrl
    ? userImageUrl
    : "/anonymous-live-stream-profile-img.webp";

  return (
    <Link
      className="rounded-md p-4 transition-all duration-200 hover:bg-black"
      href={"/live-stream/".concat(id)}
    >
      <div
        className="relative h-48 w-full rounded-sm bg-cover bg-bottom"
        style={{ backgroundImage: `url(${imageA})` }}
      >
        <div
          className="absolute bottom-4 left-4 h-8 w-8 rounded-full bg-white bg-cover shadow-md"
          style={{ backgroundImage: `url(${imageB})` }}
        ></div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <p className="flex items-center gap-2 text-sm text-gray-500">
          <UsersRoundIcon className="text-destructive h-4 w-4" />
          <span>886 watching</span>
          {/* TODO: fix this using redis */}
        </p>
        <p className="text-sm text-gray-500">{timeAgo(createdAt)}</p>
      </div>

      <h3 className="mt-2">{title}</h3>
      <small className="flex items-center gap-2 text-base text-gray-500">
        {userName ?? "Anonymous"}
        <CheckIcon className="h-3 w-3 text-emerald-500" />
      </small>
    </Link>
  );
};

export default LiveStreamItem;
