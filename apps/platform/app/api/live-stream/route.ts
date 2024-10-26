import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { title, description, rtmpSecretKey } = await request.json();

    const response = await prisma.liveStream.create({
      data: {
        rtmpSecretKey: rtmpSecretKey,
        title: title,
        description: description,
        thumbnail: "/live-stream-default-thumbnail.jpg", // TODO: replace this placeholder
      },
      select: {
        id: true,
      },
    });

    return NextResponse.json({ streamId: response.id });
  } catch (e: any) {
    console.log("[LIVE STREAM CREATE]:", e.message);
    return NextResponse.json({});
  }
}
