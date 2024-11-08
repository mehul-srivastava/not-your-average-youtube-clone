import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidateTag } from "next/cache";

export const GET = auth(async function GET(req) {
  if (!req.auth?.user?.id) {
    return NextResponse.json({ data: [] });
  }

  const response = await prisma.user.findFirst({
    where: {
      id: req.auth?.user?.id,
    },
    select: {
      subscriptions: {
        select: {
          id: true,
          imageUrl: true,
          name: true,
        },
        take: 7,
      },
    },
  });

  return NextResponse.json({
    data: response?.subscriptions,
  });
});

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const { userId, alreadySubscribed } = await request.json();

  if (session.user.id === userId) {
    return NextResponse.json({ done: false });
  }

  const obj = {
    id: userId,
  };

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      subscriptions: {
        disconnect: alreadySubscribed ? obj : undefined,
        connect: alreadySubscribed ? undefined : obj,
      },
    },
  });

  revalidateTag("subscriptions");
  return NextResponse.json({ done: true, subscribed: !alreadySubscribed });
}
