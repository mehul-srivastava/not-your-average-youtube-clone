"use client";

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

import { Button } from "@repo/shadcn/components/ui/button";
import { Input } from "@repo/shadcn/components/ui/input";

const CommentInputField = ({
  userImage,
  videoId,
}: {
  userImage: string;
  videoId: string;
}) => {
  const session = useSession();
  const router = useRouter();

  const localStorageCommentKey = "comment:".concat(videoId);

  const [inputComment, setInputComment] = useState(
    localStorage.getItem(localStorageCommentKey) || "",
  );

  async function handleClick() {
    if (session.status === "unauthenticated") {
      toast.error("You need to verify yourself first!");
      router.push("/auth/identity?redirectTo=/watch?v=".concat(videoId));
      localStorage.setItem(localStorageCommentKey, inputComment);
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/comment", {
        commentContent: inputComment,
        videoId: videoId,
      });

      setInputComment("");
      localStorage.removeItem(localStorageCommentKey);

      router.refresh();
    } catch (e: any) {
      console.log("[COMMENT]:", e.message);
      toast.error("Error occurred while posting the comment!");
    }
  }

  return (
    <div className="mt-2">
      <div className="flex items-center gap-4">
        <div
          className="h-10 w-10 rounded-full bg-white bg-cover"
          style={{
            backgroundImage: `url("${userImage}")`,
          }}
        />
        <Input
          value={inputComment}
          placeholder="Thoughts?"
          onChange={(e) => setInputComment(e.target.value)}
        />
      </div>
      <div className="mt-4 flex justify-end gap-1">
        <Button
          size="sm"
          className="text-sm"
          disabled={!inputComment}
          onClick={handleClick}
        >
          Comment
        </Button>
      </div>
    </div>
  );
};

export default CommentInputField;
