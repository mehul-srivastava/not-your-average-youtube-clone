import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";

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
