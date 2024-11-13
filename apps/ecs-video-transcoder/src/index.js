import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { GetObjectCommand } from "@aws-sdk/client-s3";

import transcodeVideo from "./transcode.js";
import { paths, videoSuperdata, s3Client } from "./config.js";

fs.mkdirSync(path.join("raw"), { recursive: true });
fs.mkdirSync(path.join("transcoded"), { recursive: true });

async function downloadVideoFromS3() {
  const data = await s3Client.send(
    new GetObjectCommand({
      Bucket: videoSuperdata.Bucket,
      Key: `${videoSuperdata.Folder}/${videoSuperdata.Key}`,
    }),
  );
  await downloadToLocal(data.Body);
}

async function downloadToLocal(body) {
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

downloadVideoFromS3()
  .then(async () => {
    await transcodeVideo();

    console.log("Gracefully exiting...");
    process.exit(0);
  })
  .catch((e) => {
    console.log("MESSAGE:", e.message);
    console.log("FULL ERROR:", e);
  });
