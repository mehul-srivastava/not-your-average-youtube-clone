import fsPromisified from "node:fs/promises";
import fs from "node:fs";
import path from "node:path";
import { args, bitrates, paths, s3Client, sqsClient } from "./config";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { DeleteMessageCommand } from "@aws-sdk/client-sqs";

async function uploadTranscodedVideos() {
  for (const { quality } of bitrates) {
    const files = await fsPromisified.readdir(paths.destination + quality);

    for (const file of files) {
      const command = new PutObjectCommand({
        Bucket: "youtube-clone-transcoded",
        Key: args.Folder + "/" + quality + "/" + file,
        Body: fs.createReadStream(path.resolve(paths.destination, quality, file)),
      });

      console.log("Uploading:", file);
      await s3Client.send(command);

      // To avoid being rate-limitted
      await new Promise((res) => setTimeout(res, 200));
    }
  }

  const command = new DeleteMessageCommand({
    QueueUrl: "https://sqs.eu-north-1.amazonaws.com/886436961672/youtube-clone-raw-video-s3-events",
    ReceiptHandle: process.env.RECEIPT_HANDLE!,
  });
  await sqsClient.send(command);

  console.log("Uploading completed");
}

export default uploadTranscodedVideos;
