import fsPromisified from "node:fs/promises";
import fs from "node:fs";
import path from "node:path";
import { videoSuperdata, bitrates, paths, s3Client, sqsClient } from "./config";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { DeleteMessageCommand } from "@aws-sdk/client-sqs";

async function uploadTranscodedVideos() {
  for (const { dimensions } of bitrates) {
    const qualityWithPixel = dimensions.split(":")[1] + "p";
    const files = await fsPromisified.readdir(
      paths.destination + qualityWithPixel,
    );

    for (const file of files) {
      const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_DESTINATION_BUCKET_NAME!,
        Key: videoSuperdata.Folder + "/" + qualityWithPixel + "/" + file,
        Body: fs.createReadStream(
          path.resolve(paths.destination, qualityWithPixel, file),
        ),
      });

      console.log("Uploading:", file);
      await s3Client.send(command);

      // To avoid being rate-limitted
      await new Promise((res) => setTimeout(res, 200));
    }
  }

  // Upload master manifest
  const masterManifestCommand = new PutObjectCommand({
    Bucket: process.env.AWS_S3_DESTINATION_BUCKET_NAME!,
    Key: videoSuperdata.Folder + "/" + "master.m3u8",
    Body: fs.createReadStream(path.resolve(paths.destination, "master.m3u8")),
  });
  await s3Client.send(masterManifestCommand);

  // Deleting message from queue to avoid infinite loop
  const command = new DeleteMessageCommand({
    QueueUrl: process.env.AWS_SQS_QUEUE_URL,
    ReceiptHandle: process.env.AWS_SQS_MESSAGE_RECEIPT_HANDLE,
  });
  await sqsClient.send(command);

  console.log("Uploading completed");
}

export default uploadTranscodedVideos;
