import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "node:crypto";
import { createId } from "@paralleldrive/cuid2";

import s3Client from "@/lib/s3";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ notdone: true });
  }

  const { filename, title, description, thumbnail } = await request.json();
  const timestamp = new Date().getTime().toString();

  // TODO: fix the cloudfront url here - should come from an env
  const { id: videoId } = await prisma.video.create({
    data: {
      manifestFile: `https://dbamfvca6yflw.cloudfront.net/${createId()}/master.m3u8`,
      title: title,
      description: description,
      thumbnail: thumbnail ?? "",
      userId: session.user.id!,
    },
    select: {
      id: true,
    },
  });

  const objectKey = videoId.concat("/") + filename.substring(0, filename.length - 4) + "_" + timestamp + ".mp4";

  const command = new PutObjectCommand({
    Bucket: "youtube-clone-temporary",
    Key: objectKey,
  });

  const url = await getSignedUrl(s3Client, command, { expiresIn: 60 });

  return NextResponse.json({ url: url });
}
