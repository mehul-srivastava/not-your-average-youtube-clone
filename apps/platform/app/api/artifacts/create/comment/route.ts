import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { commentContent, videoId } = await request.json();

    await prisma.comment.create({
      data: {
        content: commentContent,
        videoId: videoId,
        userId: session.user.id,
      },
    });

    // revalidateTag("comments")
    // TODO: fetch comments and revalidate them here

    return NextResponse.json({});
  } catch (e: any) {
    console.log("[CREATE.COMMENT]:", e.message);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
