import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "node:crypto";

import s3Client from "@/lib/s3";

export async function POST(request: NextRequest) {
  const { filename }: { filename: string } = await request.json();

  const timestamp = new Date().getTime().toString();

  const folderName = crypto
    .createHash("sha256")
    .update(timestamp)
    .digest("hex")
    .slice(0, 25)
    .concat("/");
  const objectKey =
    folderName +
    filename.substring(0, filename.length - 4) +
    "_" +
    timestamp +
    ".mp4";

  const command = new PutObjectCommand({
    Bucket: "youtube-clone-temporary",
    Key: objectKey,
  });

  const url = await getSignedUrl(s3Client, command, { expiresIn: 60 });

  return NextResponse.json({ url: url });
}
