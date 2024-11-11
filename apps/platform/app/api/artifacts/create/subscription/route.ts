import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { userId, alreadySubscribed } = await request.json();

    if (session.user.id === userId) {
      return NextResponse.json({ success: false, subscribed: false });
    }

    // TODO: implement a lock mechanism with rate limitting - if user presses buttons too many times then lock their option

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        subscriptions: {
          disconnect: alreadySubscribed ? { id: userId } : undefined,
          connect: alreadySubscribed ? undefined : { id: userId },
        },
      },
    });

    // revalidateTag("subscriptions");
    // TODO: fix tag revalidation here (+for comments just in case)

    return NextResponse.json({ success: true, subscribed: !alreadySubscribed });
  } catch (e: any) {
    console.log("[CREATE.SUBSCRIPTION]:", e.message);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
