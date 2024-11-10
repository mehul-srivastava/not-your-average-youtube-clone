import { NextRequest, NextResponse } from "next/server";
import redis from "@/lib/redis";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { id } = await request.json();

  const video = await prisma.video.findFirst({
    where: {
      id,
    },
  });

  if (!video) {
    return NextResponse.json({ notfound: true });
  }

  if (video.viewCount <= 300) {
    await prisma.video.update({
      where: {
        id,
      },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({ done: true });
  }

  const key = "video:".concat(id);
  await redis.incr(key);
  return NextResponse.json({ done: true });
}
