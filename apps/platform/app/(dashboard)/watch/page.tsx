import React from "react";

import VideoPlayer from "@/components/video-player";
import RecommendVideo from "./__components/recommended-video";
import VideoMetadata from "./__components/video-metadata";
import CommentSection from "./__components/comment-section";
import { redirect } from "next/navigation";

interface IPageProps {
  searchParams: {
    v: string;
  };
}

const page = ({ searchParams }: IPageProps) => {
  if (!searchParams.v) redirect("/");

  console.log(searchParams.v);

  return (
    <div className="flex gap-4 p-10">
      <div className="flex w-9/12 flex-col gap-4">
        <VideoPlayer
          m3u8Url="https://dbamfvca6yflw.cloudfront.net/1bf2bf80643829860a70a4367470fb/master.m3u8"
          isLive={false}
          poster={"https://vjs.zencdn.net/v/oceans.png"}
        />
        <VideoMetadata />
        <CommentSection />
      </div>
      <div className="flex w-3/12 flex-col gap-4">
        {Array.from(new Array(20)).map((item) => (
          <RecommendVideo key={Math.random()} />
        ))}
      </div>
    </div>
  );
};

export default page;
