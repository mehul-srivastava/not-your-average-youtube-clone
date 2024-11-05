"use client";

import React, { useState } from "react";

import { Button } from "@repo/shadcn/components/ui/button";
import { Input } from "@repo/shadcn/components/ui/input";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { revalidatePath } from "next/cache";

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

  const [inputComment, setInputComment] = useState("");

  async function handleClick() {
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

    await axios.post("http://localhost:3000/api/comment", {
      commentContent: inputComment,
      videoId: videoId,
    });
  }

  return (
    <>
      <div className="flex items-center gap-4">
        <div
          className="h-10 w-10 rounded-full bg-white bg-cover"
          style={{
            backgroundImage: `url("${userImage ?? "https://png.pngtree.com/png-vector/20220807/ourmid/pngtree-man-avatar-wearing-gray-suit-png-image_6102786.png"}")`,
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
