import { CommentType } from "@/types";
import { timeAgo } from "@/utils";
import React from "react";

type IComponentProps = Omit<CommentType, "videoId" | "userId" | "id"> & {
  userImage: string;
  userName: string;
};

const CommentItem = ({
  userImage,
  userName,
  content,
  createdAt,
}: IComponentProps) => {
  return (
    <div className="flex items-center gap-4">
      <div
        className="h-10 w-10 rounded-full bg-cover"
        style={{ backgroundImage: `url("${userImage}")` }}
      />
      <div className="w-fit">
        <h5 className="text-lg">
          {userName}
          <small className="ml-2 text-xs text-gray-500">
            {timeAgo(new Date(createdAt))}
          </small>
        </h5>
        <p className="text-sm font-thin" style={{ fontFamily: "sans-serif" }}>
          {content}
        </p>
      </div>
    </div>
  );
};

export default CommentItem;
