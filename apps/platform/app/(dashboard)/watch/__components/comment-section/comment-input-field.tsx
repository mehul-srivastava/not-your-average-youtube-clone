"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import axiosInstance from "@/lib/axios";
import { Button } from "@repo/shadcn/components/ui/button";
import { Input } from "@repo/shadcn/components/ui/input";

interface IComponentProps {
  userImage: string;
  videoId: string;
}

const CommentInputField = ({ userImage, videoId }: IComponentProps) => {
  const session = useSession();
  const router = useRouter();

  const localStorageCommentKey = "comment:".concat(videoId);
  const initialValue = typeof window !== "undefined" ? localStorage.getItem(localStorageCommentKey) || "" : "";

  const [inputComment, setInputComment] = useState(initialValue);

  async function handleClick() {
    if (session.status === "unauthenticated") {
      toast.error("You need to verify yourself first!");
      router.push("/auth/identity?redirectTo=/watch?v=".concat(videoId));
      localStorage.setItem(localStorageCommentKey, inputComment);
      return;
    }

    try {
      await axiosInstance.post("/artifacts/create/comment", {
        commentContent: inputComment,
        videoId: videoId,
      });

      setInputComment("");
      localStorage.removeItem(localStorageCommentKey);

      router.refresh();
      toast.success("Your comment has been posted!");
    } catch {
      toast.error("Something went wrong!");
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
        <Input value={inputComment} placeholder="Thoughts?" onChange={(e) => setInputComment(e.target.value)} />
      </div>
      <div className="mt-4 flex justify-end gap-1">
        <Button size="sm" className="text-sm" disabled={!inputComment} onClick={handleClick}>
          Comment
        </Button>
      </div>
    </div>
  );
};

export default CommentInputField;
