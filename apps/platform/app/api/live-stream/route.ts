import { NextRequest, NextResponse } from "next/server";
import prisma from "@/clients/prisma";

export async function POST(request: NextRequest) {
  try {
    const { title, description, rtmpSecretKey } = await request.json();

    await prisma.liveStream.create({
      data: {
        rtmpSecretKey: rtmpSecretKey,
        title: title,
        description: description,
      },
    });

    return NextResponse.json({});
  } catch (e: any) {
    console.log("[LIVE STREAM CREATE]:", e.message);
    return NextResponse.json({});
  }
}
