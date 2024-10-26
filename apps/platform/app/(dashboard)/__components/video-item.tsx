import React from "react";
import { CheckIcon, EyeIcon, FlameIcon } from "lucide-react";

const VideoItem = () => {
  return (
    <a
      className="rounded-md p-2 transition-all duration-200 hover:bg-black"
      href="/"
    >
      <div className="relative h-48 w-full rounded-sm bg-[url(https://random.imagecdn.app/600/400)] bg-cover" />

      <div className="mt-3 flex items-center justify-between">
        <p className="flex items-center gap-2 text-sm text-gray-500">
          <EyeIcon className="text-destructive h-4 w-4" />
          <span>2.1M views</span>
        </p>
        <p className="text-sm text-gray-500">25 minutes ago</p>
      </div>

      <h3 className="mt-2 font-normal">
        Young adults with physical disability find independence
      </h3>
      <small className="flex items-center gap-2 text-base font-normal text-gray-500">
        Youtube <CheckIcon className="h-3 w-3 text-emerald-500" />
      </small>
    </a>
  );
};

export default VideoItem;
