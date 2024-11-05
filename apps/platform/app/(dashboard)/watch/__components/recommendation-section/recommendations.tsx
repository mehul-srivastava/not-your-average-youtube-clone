import React from "react";

import prisma from "@/lib/prisma";
import RecommendVideoItem from "./recommendation-item";

const Recommendations = async ({
  searchParams,
}: {
  searchParams: { v: string };
}) => {
  const otherVideos = await prisma.video.findMany({
    where: {
      id: {
        not: searchParams.v,
      },
    },
    select: {
      id: true,
      title: true,
      thumbnail: true,
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
      thumbnail={item.thumbnail}
      userName={item.user.name}
      createdAt={item.createdAt}
    />
  ));
};

export default Recommendations;
