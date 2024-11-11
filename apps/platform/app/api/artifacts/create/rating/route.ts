import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { videoId, like } = await request.json();
    const hasLiked = Boolean(like);

    // TODO: put data into kafka to be taken up by a consumer via a cron job (when likes exceed 1000)

    // TODO: change logic for this api asap - client should handle if update is needed or not instead of api making multiple db calls

    const existingRating = await prisma.rating.findFirst({ where: { videoId, userId: session.user.id } });

    if (!existingRating) {
      await prisma.rating.create({
        data: {
          videoId,
          choice: hasLiked ? "LIKE" : "DISLIKE",
          userId: session.user.id,
        },
      });
      return NextResponse.json({ success: true });
    }

    if (existingRating.choice === (hasLiked ? "LIKE" : "DISLIKE")) {
      return NextResponse.json({ success: false });
    }

    await prisma.rating.update({
      data: { choice: hasLiked ? "LIKE" : "DISLIKE" },
      where: {
        userId_videoId: { videoId: videoId, userId: session.user.id },
      },
    });

    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.log("[CREATE.RATING:]", e.message);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
