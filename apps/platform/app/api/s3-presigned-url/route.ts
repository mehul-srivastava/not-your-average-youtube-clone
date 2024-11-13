import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "node:crypto";
import { createId } from "@paralleldrive/cuid2";

import s3Client from "@/lib/s3";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { getCloudfrontManifestUrl } from "@/utils";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { filename, title, description, thumbnail } = await request.json();
    const cuid = createId();

    const timestamp = new Date().getTime().toString();
    const manifestFile = getCloudfrontManifestUrl(cuid);
    const objectKey = cuid.concat("/") + filename.substring(0, filename.length - 4) + "_" + timestamp + ".mp4";

    await prisma.video.create({
      data: {
        id: cuid,
        manifestFile: manifestFile,
        title: title,
        description: description,
        thumbnail: thumbnail ?? "",
        userId: session.user.id!,
      },
      select: {
        id: true,
      },
    });

    const command = new PutObjectCommand({
      Bucket: "youtube-clone-temporary",
      Key: objectKey,
    });

    // TODO: add caching here for signed url so in case a user rejects, we can use the same url for another upload
    const url = await getSignedUrl(s3Client, command, { expiresIn: 60 * 3 });

    return NextResponse.json({ url: url });
  } catch (e: any) {
    console.log("[PRESIGNED URL]:", e.message);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
