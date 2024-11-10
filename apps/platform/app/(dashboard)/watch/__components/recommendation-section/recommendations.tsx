import React from "react";

import prisma from "@/lib/prisma";
import RecommendVideoItem from "./recommendation-item";

interface IComponentProps {
  searchParams: { v: string };
}

const Recommendations = async ({ searchParams }: IComponentProps) => {
  const otherVideos = await prisma.video.findMany({
    where: {
      id: {
        not: searchParams.v,
      },
      isReady: true,
    },
    select: {
      id: true,
      title: true,
      thumbnail: true,
      viewCount: true,
      createdAt: true,
      user: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return otherVideos.map((item) => (
    <RecommendVideoItem
      key={item.id}
      id={item.id}
      title={item.title}
      viewCount={item.viewCount}
      thumbnail={item.thumbnail}
      userName={item.user.name}
      createdAt={item.createdAt}
    />
  ));
};

export default Recommendations;
