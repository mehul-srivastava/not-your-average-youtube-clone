import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { $Enums } from "@prisma/client";

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
    console.log("[LIVE STREAM CREATE]:", e.message);
    return NextResponse.json({});
  }
}

export async function PATCH(request: NextRequest) {
  const { secretKey, isFinished } = await request.json();

  await prisma.liveStream.update({
    where: {
      rtmpSecretKey: secretKey,
    },
    data: {
      isFinished: {
        set: isFinished ? $Enums.Status.ENDED : $Enums.Status.RUNNING,
      },
    },
  });

  return NextResponse.json({});
}
