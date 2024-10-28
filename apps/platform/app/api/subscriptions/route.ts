import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { ApiGetSubscriptions } from "@/types";
import { revalidateTag } from "next/cache";

export async function GET() {
  const session = await auth();

  const response = await prisma.user.findFirst({
    where: {
      id: session?.user?.id,
    },
    select: {
      subscriptions: {
        select: {
          id: true,
          imageUrl: true,
        },
        take: 7,
      },
    },
  });

  return NextResponse.json({
    data: response?.subscriptions,
  });
}
