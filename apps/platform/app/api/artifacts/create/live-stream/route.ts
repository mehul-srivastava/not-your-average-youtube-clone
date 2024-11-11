import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { title, description, rtmpSecretKey, thumbnail } = await request.json();

    const response = await prisma.liveStream.create({
      data: {
        rtmpSecretKey: rtmpSecretKey,
        title: title,
        description: description,
        thumbnail: thumbnail ?? "/anonymous-live-stream-thumbnail-img.jpg",
      },
      select: {
        id: true,
      },
    });

    return NextResponse.json({ streamId: response.id });
  } catch (e: any) {
    console.log("[CREATE.LIVE-STREAM]:", e.message);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
