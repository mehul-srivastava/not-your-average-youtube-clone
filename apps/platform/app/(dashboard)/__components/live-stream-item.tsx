import React from "react";
import { CheckIcon, UsersRoundIcon } from "lucide-react";
import Link from "next/link";

import { ILiveStreamItem } from "@/types";
import { timeAgo } from "@/utils";

const LiveStreamItem = ({
  id,
  title,
  createdAt,
  user,
}: Omit<ILiveStreamItem, "rtmpSecretKey" | "description"> & { user: any }) => {
  // change user type and add to types
  return (
    <Link
      className="rounded-md p-4 transition-all duration-200 hover:bg-black"
      href={"/live-stream/".concat(id)}
    >
      <div className="relative h-48 w-full rounded-sm bg-[url(/live-stream-default-thumbnail.jpg)] bg-cover">
        <div className="absolute bottom-4 left-4 h-8 w-8 rounded-full bg-white bg-[url(https://www.pngplay.com/wp-content/uploads/13/Google-Logo-PNG-Photo-Image.png)] bg-cover shadow-md"></div>
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
        Youtube <CheckIcon className="h-3 w-3 text-emerald-500" />
      </small>
    </Link>
  );
};

export default LiveStreamItem;
