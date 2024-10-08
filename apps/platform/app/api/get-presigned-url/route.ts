import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import s3Client from "@/clients/s3-client";

export async function POST(request: NextRequest) {
  const { filename }: { filename: string } = await request.json();

  const key = filename.substring(0, filename.length - 4) + new Date().getTime() + ".mp4";

  const command = new PutObjectCommand({
    Bucket: "youtube-clone-temporary",
    Key: key,
  });

  const url = await getSignedUrl(s3Client, command, { expiresIn: 30 });

  return NextResponse.json({ url });
}
