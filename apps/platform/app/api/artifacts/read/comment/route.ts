import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const videoId = url.searchParams.get("videoId");

  if (!videoId) {
    return NextResponse.json({});
  }

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

  return NextResponse.json({ data: data });
}
