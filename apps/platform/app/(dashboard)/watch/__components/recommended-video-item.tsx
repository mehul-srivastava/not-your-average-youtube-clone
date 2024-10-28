import { VideoType } from "@/types";
import { timeAgo } from "@/utils";
import Link from "next/link";
import React from "react";

type IRecommendVideoItem = Omit<
  VideoType,
  "description" | "manifestFile" | "updatedAt" | "userId"
> & { userName: string };

const RecommendVideoItem = ({
  id,
  title,
  thumbnail,
  createdAt,
  userName,
}: IRecommendVideoItem) => {
  return (
    <Link href={"/watch?v=".concat(id)} className="cursor-pointer">
      <div className="flex w-full cursor-pointer gap-2 rounded-md p-1 transition-all duration-200 hover:bg-slate-900">
        <div
          className="min-h-[100px] min-w-[150px] rounded-md bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${thumbnail})` }}
        />
        <div className="flex h-full flex-col justify-between">
          <div>
            <h3 className="text-base leading-tight">{title}</h3>
            <p className="mt-1 text-sm text-gray-400">{userName}</p>
          </div>
          <small className="text-gray-500">
            1023 views • {timeAgo(createdAt)}{" "}
            {/* TODO: fetch views from redis */}
          </small>
        </div>
      </div>
    </Link>
  );
};

export default RecommendVideoItem;
