"use client";

import React, { useState } from "react";

import { Button } from "@repo/shadcn/components/ui/button";
import { Input } from "@repo/shadcn/components/ui/input";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

const InputCommentItem = ({
  userId,
  userImage,
  videoId,
}: {
  userId: string;
  userImage: string;
  videoId: string;
}) => {
  const session = useSession();
  const router = useRouter();

  const [inputComment, setInputComment] = useState("LOGIN TO VIEW LEFT IMAGE");

  function handleClick() {
    if (session.status === "unauthenticated") {
      toast.error("You need to verify yourself first!");
      router.push(
        "/auth/identity?redirectTo=/watch?v="
          .concat(videoId)
          .concat("&comment=")
          .concat(inputComment),
      );
      return;
    }
  }

  return (
    <>
      <div className="flex items-center gap-4">
        <div
          className="h-10 w-10 rounded-full bg-cover"
          style={{ backgroundImage: `url(${userImage})` }}
        />
        <Input
          value={inputComment}
          onChange={(e) => setInputComment(e.target.value)}
        />
      </div>
      <div className="mt-4 flex justify-end gap-1">
        <Button
          size={"sm"}
          className="text-sm"
          disabled={!inputComment}
          onClick={handleClick}
        >
          Comment
        </Button>
      </div>
    </>
  );
};

export default InputCommentItem;
