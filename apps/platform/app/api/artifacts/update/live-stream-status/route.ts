import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { $Enums } from "@prisma/client";

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
