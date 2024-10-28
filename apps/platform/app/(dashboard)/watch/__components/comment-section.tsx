import React from "react";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import InputCommentItem from "./input-comment-item";
import CommentItem from "./comment-item";
import { displayCommentsCount } from "@/utils";

const CommentSection = async ({ videoId }: { videoId: string }) => {
  const session = await auth();

  const data = await prisma.video.findFirst({
    where: {
      id: videoId,
    },
    select: {
      _count: {
        select: {
          comments: true,
        },
      },
      comments: {
        select: {
          id: true,
          user: {
            select: {
              name: true,
              imageUrl: true,
            },
          },
          content: true,
          createdAt: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="mt-6 h-full w-full">
      <h3 className="text-2xl">
        {displayCommentsCount(data?._count.comments!)} comments
      </h3>
      <div className="mt-2">
        <InputCommentItem
          userId={session?.user?.id!}
          userImage={session?.user?.image!}
        />
      </div>
      <div className="mt-6 flex flex-col gap-4">
        {/* DO NOT REMOVE THIS SNIPPET: New comments feature */}
        <div className="flex items-center gap-4 rounded-md bg-gray-800 p-4">
          <div>
            <h5 className="text-lg">
              @admin ⭐
              <small className="ml-2 text-xs text-gray-500">always</small>
            </h5>
            <p
              className="text-sm font-thin"
              style={{ fontFamily: "sans-serif" }}
            >
              Nested/pinned comments and upvotes feature coming up soon!
            </p>
          </div>
        </div>
        {/* DO NOT REMOVE THIS SNIPPET */}

        {data?.comments.map((item) => (
          <CommentItem
            key={item.id}
            content={item.content}
            userName={item.user.name}
            userImage={item.user.imageUrl}
            createdAt={item.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
