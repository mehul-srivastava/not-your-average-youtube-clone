import fs from "node:fs";
import { Readable } from "node:stream";
import { GetObjectCommand } from "@aws-sdk/client-s3";

import transcodeVideo from "./transcode";
import { paths, videoSuperdata, s3Client } from "./config";

async function downloadVideoFromS3() {
  const data = await s3Client.send(
    new GetObjectCommand({
      Bucket: videoSuperdata.Bucket,
      Key: `${videoSuperdata.Folder}/${videoSuperdata.Key}`,
    }),
  );
  await downloadToLocal(data.Body as Readable);
}

async function downloadToLocal(body: Readable) {
  if (!(body instanceof Readable)) {
    throw new Error("Body is not a readable stream");
  }

  const originPath = `${paths.origin}/${videoSuperdata.Key}`;
  const writeStream = fs.createWriteStream(originPath);

  return new Promise((resolve, reject) => {
    body
      .pipe(writeStream)
      .on("error", reject)
      .on("finish", () => {
        console.log("Download completed");
        resolve(null);
      });
  });
}

downloadVideoFromS3().then(async () => {
  await transcodeVideo();

  console.log("Gracefully exiting...");
  process.exit(0);
});
