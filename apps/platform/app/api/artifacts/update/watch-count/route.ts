import { NextRequest, NextResponse } from "next/server";
import redis from "@/lib/redis";
import prisma from "@/lib/prisma";

export async function PATCH(request: NextRequest) {
  try {
    const { id } = await request.json();

    const video = await prisma.video.findFirst({
      where: {
        id,
      },
    });

    if (!video) {
      return new NextResponse("Video Not Found", { status: 404 });
    }

    if (video.viewCount <= 300) {
      await prisma.video.update({
        where: { id },
        data: { viewCount: { increment: 1 } },
      });
    } else {
      const key = "video:".concat(id);
      await redis.incr(key);
    }

    return NextResponse.json({});
  } catch (e: any) {
    console.log("[UPDATE.WATCH-COUNT]:", e.message);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
