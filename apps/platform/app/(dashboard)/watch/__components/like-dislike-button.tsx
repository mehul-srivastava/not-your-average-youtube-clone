"use client";

import { Button } from "@repo/shadcn/components/ui/button";
import axios from "axios";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
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
  const [ratings, setCount] = useState({ likeCount, dislikeCount });

  async function likeThisVideo() {
    if (session.status === "unauthenticated") {
      toast.error("You need to verify yourself first!");
      router.push("/auth/identity?redirectTo=/watch?v=".concat(videoId));
      return;
    }

    const response = await axios.post(
      "http://localhost:3000/api/like-dislike",
      {
        like: true,
        videoId: videoId,
      },
    );
    if (!response.data.done) return;

    setCount((prev) => ({
      ...prev,
      likeCount: ++prev.likeCount,
      dislikeCount: prev.dislikeCount <= 0 ? 0 : --prev.dislikeCount,
    }));
  }

  async function dislikeThisVideo() {
    if (session.status === "unauthenticated") {
      toast.error("You need to verify yourself first!");
      router.push("/auth/identity?redirectTo=/watch?v=".concat(videoId));
      return;
    }

    const response = await axios.post(
      "http://localhost:3000/api/like-dislike",
      {
        dislike: true,
        videoId: videoId,
      },
    );

    if (!response.data.done) return;

    setCount((prev) => ({
      dislikeCount: ++prev.dislikeCount,
      likeCount: prev.likeCount <= 0 ? 0 : --prev.likeCount,
    }));
  }

  return (
    <div className="flex w-full max-w-xs items-center justify-end shadow-md">
      <Button
        className="flex items-center rounded-none rounded-l-md border-r border-gray-300"
        size={"sm"}
        onClick={likeThisVideo}
      >
        <ThumbsUpIcon className="h-4 w-4" />
        <span className="ml-2">{ratings.likeCount}</span>
      </Button>
      <Button
        className="flex items-center rounded-none rounded-r-md"
        size={"sm"}
        onClick={dislikeThisVideo}
      >
        <ThumbsDownIcon className="h-4 w-4" />
        <span className="ml-2">{ratings.dislikeCount}</span>
      </Button>
    </div>
  );
};

export default LikeDislikeButton;
