"use client";

import { Button } from "@repo/shadcn/components/ui/button";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const LikeDislikeButton = ({
  likeCount,
  dislikeCount,
  videoId,
}: {
  likeCount: number;
  dislikeCount: number;
  videoId: string;
}) => {
  const session = useSession();
  const router = useRouter();

  function likeThisVideo() {
    if (session.status === "unauthenticated") {
      toast.error("You need to verify yourself first!");
      router.push("/auth/identity?redirectTo=/watch?v=".concat(videoId));
      return;
    }
  }

  function dislikeThisVideo() {
    if (session.status === "unauthenticated") {
      toast.error("You need to verify yourself first!");
      router.push("/auth/identity?redirectTo=/watch?v=".concat(videoId));
      return;
    }
  }

  return (
    <div className="flex w-full max-w-xs items-center justify-between shadow-md">
      <Button
        className="flex items-center rounded-none rounded-l-md border-r border-gray-300"
        size={"sm"}
        onClick={likeThisVideo}
      >
        <ThumbsUpIcon className="h-4 w-4" />
        <span className="ml-2">{likeCount}</span>
      </Button>
      <Button
        className="flex items-center rounded-none rounded-r-md"
        size={"sm"}
        onClick={dislikeThisVideo}
      >
        <ThumbsDownIcon className="h-4 w-4" />
        <span className="ml-2">{dislikeCount}</span>
      </Button>
    </div>
  );
};

export default LikeDislikeButton;
