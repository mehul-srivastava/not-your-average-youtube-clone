import { Button } from "@repo/shadcn/components/ui/button";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import React from "react";

const VideoMetadata = () => {
  return (
    <div>
      {/* Video Metadata */}
      <div className="mt-2 flex w-full items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">
            {/* Only 100 chars allowed */}
            Relaxing Music For Stress Relief
          </h2>
          <p className="text-xl font-normal text-gray-500">604,929,123 views</p>
        </div>
        <div className="flex items-center justify-start gap-2">
          <LikeDislikeButton likeCount={12} dislikeCount={304} />
          <SubscribeButton />
        </div>
      </div>

      {/* Channel Metadata */}
      <div className="mt-6 flex items-center gap-2">
        <div className="h-10 w-10 rounded-full bg-emerald-500"></div>
        <div>
          <h3 className="text-lg">Javascript Mastery</h3>
          <h4 className="text-sm font-thin text-gray-500">2.6M subscribers</h4>
        </div>
      </div>
      <p className="mt-2 text-gray-300">
        {/* 300 chars only allowed */}
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur
        tempore magnam praesentium odit et exercitationem, cum quos laudantium
        architecto! Fuga minus voluptatibus laborum corrupti asperiores odio
        dolore, esse itaque doloribus? Lorem ipsum dolor sit, amet consectetur
        adipisicing elit.
      </p>
    </div>
  );
};

const SubscribeButton = () => {
  return (
    <Button size={"sm"} variant={"destructive"}>
      Subscribe
    </Button>
  );
};

const LikeDislikeButton = ({
  likeCount,
  dislikeCount,
}: {
  likeCount: number;
  dislikeCount: number;
}) => {
  return (
    <div className="flex w-full max-w-xs items-center justify-between shadow-md">
      <Button
        className="flex items-center rounded-none rounded-l-md border-r border-gray-300"
        size={"sm"}
      >
        <ThumbsUpIcon className="h-4 w-4" />
        <span className="ml-2">{likeCount}</span>
      </Button>
      <Button
        className="flex items-center rounded-none rounded-r-md"
        size={"sm"}
      >
        <ThumbsDownIcon className="h-4 w-4" />
        <span className="ml-2">{dislikeCount}</span>
      </Button>
    </div>
  );
};

export default VideoMetadata;
