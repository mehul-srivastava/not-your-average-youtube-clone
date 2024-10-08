import fsPromisified from "node:fs/promises";
import fs from "node:fs";
import path from "path";
import { DeleteMarkerReplicationStatus, PutObjectCommand } from "@aws-sdk/client-s3";

import { s3Client, sqsClient } from "./config";
import { DeleteMessageCommand, DeleteQueueCommand } from "@aws-sdk/client-sqs";

async function uploadTranscodedVideos() {
  const destinationPath = path.join(__dirname, "../", "transcoded/");
  const files = await fsPromisified.readdir(destinationPath);

  for (const file of files) {
    const filePath = path.resolve(destinationPath, file);

    const command = new PutObjectCommand({
      Bucket: "youtube-clone-transcoded",
      Key: file,
      Body: fs.createReadStream(filePath),
    });

    console.log("Uploading:", file);
    await s3Client.send(command);

    // To avoid being rate-limitted
    await new Promise((res) => setTimeout(res, 3000));
  }

  const command = new DeleteMessageCommand({
    QueueUrl: "https://sqs.eu-north-1.amazonaws.com/886436961672/youtube-clone-raw-video-s3-events",
    ReceiptHandle: process.env.RECEIPT_HANDLE!,
  });
  await sqsClient.send(command);

  console.log("Uploading completed");
}

export default uploadTranscodedVideos;
