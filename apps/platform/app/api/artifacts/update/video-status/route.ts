import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const data = await request.json();

  await prisma.video.update({
    where: {
      id: data.id,
    },
    data: {
      isReady: true,
    },
  });

  return NextResponse.json({ done: true });
}
