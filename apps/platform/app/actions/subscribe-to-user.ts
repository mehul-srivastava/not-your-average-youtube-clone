"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export async function addSubscriptionAction(userId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  if (session.user === userId) {
    return { success: false, user: "same " };
  }

  const response = await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      subscriptions: {
        connect: {
          id: userId,
        },
      },
    },
  });

  revalidateTag("subscriptions");
  return { success: true, user: response };
}
