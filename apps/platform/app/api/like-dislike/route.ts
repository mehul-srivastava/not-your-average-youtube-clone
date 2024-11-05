import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";

type Data = {
  videoId: string;
  like?: boolean;
};

export async function POST(request: NextRequest) {
  const data: Data = await request.json();
  const session = await auth();

  if (!session?.user?.id) throw new Error("Unauthorized");

  const hasLiked = Boolean(data.like);

  const existingRating = await prisma.rating.findFirst({
    where: { videoId: data.videoId, userId: session.user.id },
  });

  if (!existingRating) {
    await prisma.rating.create({
      data: {
        videoId: data.videoId,
        choice: hasLiked ? "LIKE" : "DISLIKE",
        userId: session.user.id,
      },
    });
  } else if (
    (existingRating.choice === "LIKE" && hasLiked) ||
    (existingRating.choice === "DISLIKE" && !hasLiked)
  ) {
    return NextResponse.json({ done: false });
  } else {
    await prisma.rating.update({
      data: { choice: hasLiked ? "LIKE" : "DISLIKE" },
      where: {
        userId_videoId: { videoId: data.videoId, userId: session.user.id },
      },
    });
  }

  return NextResponse.json({ done: true });
}
