"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Button } from "@repo/shadcn/components/ui/button";
import { $Enums } from "@prisma/client";

interface IComponentProps {
  likeCount: number;
  dislikeCount: number;
  videoId: string;
  currentUserHasLiked: $Enums.Choice | undefined;
}

const LikeDislikeButton = ({
  likeCount,
  dislikeCount,
  videoId,
  currentUserHasLiked,
}: IComponentProps) => {
  const [ratings, setRatings] = useState({ likeCount, dislikeCount });
  const [currentSelection, setCurrentSelection] = useState(currentUserHasLiked);

  const session = useSession();
  const router = useRouter();

  async function rateThisVideo(hasLiked: boolean) {
    if (session.status === "unauthenticated") {
      toast.error("You need to verify yourself first!");
      router.push("/auth/identity?redirectTo=/watch?v=".concat(videoId));
      return;
    }

    const response = await axios.post(
      "http://localhost:3000/api/like-dislike",
      {
        like: hasLiked,
        videoId: videoId,
      },
    );

    if (!response.data.done) {
      toast.error(
        `You have already ${hasLiked ? "liked" : "disliked"} this video!`,
      );
      return;
    }

    setCurrentSelection(hasLiked ? "LIKE" : "DISLIKE");

    setRatings((prev) => {
      const newDislikeCount = hasLiked
        ? Math.max(prev.dislikeCount - 1, 0)
        : prev.dislikeCount + 1;

      const newLikeCount = hasLiked
        ? prev.likeCount + 1
        : Math.max(prev.likeCount - 1, 0);

      return {
        dislikeCount: newDislikeCount,
        likeCount: newLikeCount,
      };
    });
  }

  useEffect(() => {
    setRatings({ likeCount, dislikeCount });
  }, [likeCount, dislikeCount]);

  return (
    <div className="flex w-full max-w-xs items-center justify-end shadow-md">
      {/* Like Button */}
      <Button
        className="flex items-center rounded-none rounded-l-md"
        size="sm"
        onClick={() => rateThisVideo(true)}
      >
        <ThumbsUpIcon
          className="h-4 w-4"
          fill={currentSelection === "LIKE" ? "#000" : "transparent"}
        />
        <span className="ml-2">{ratings.likeCount}</span>
      </Button>

      {/* Dislike Button */}
      <Button
        className="flex items-center rounded-none rounded-r-md"
        size="sm"
        onClick={() => rateThisVideo(false)}
      >
        <ThumbsDownIcon
          className="h-4 w-4"
          fill={currentSelection === "DISLIKE" ? "#000" : "transparent"}
        />
        <span className="ml-2">{ratings.dislikeCount}</span>
      </Button>
    </div>
  );
};

export default LikeDislikeButton;
