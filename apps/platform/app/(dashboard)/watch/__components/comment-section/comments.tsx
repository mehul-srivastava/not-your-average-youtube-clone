import React from "react";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import UpcomingFeature from "@/components/upcoming-feature";
import { displayLongCount, pluralOrSingular } from "@/utils";
import CommentInputField from "./comment-input-field";
import CommentItem from "./comment-item";

const Comments = async ({ videoId }: { videoId: string }) => {
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
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return (
    <div className="mt-6 h-full w-full">
      <h3 className="text-2xl">
        {displayLongCount(data?._count.comments || 0)}{" "}
        {pluralOrSingular("comment", data?._count.comments || 0)}
      </h3>
      <CommentInputField
        videoId={videoId}
        userImage={
          session?.user?.image ??
          "https://png.pngtree.com/png-vector/20220807/ourmid/pngtree-man-avatar-wearing-gray-suit-png-image_6102786.png"
        }
      />
      <div className="mt-6 flex flex-col gap-4">
        <UpcomingFeature message="Nested/pinned comments and upvotes feature coming up soon!" />

        {!data ||
          (data.comments.length <= 0 &&
            "Be the first to share your thoughts on this video!")}

        {data &&
          data.comments.length > 0 &&
          data.comments.map((item) => (
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

export default Comments;
