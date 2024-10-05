import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { GetObjectCommand } from "@aws-sdk/client-s3";

import transcodeVideo from "./transcode";
import { params, s3Client } from "./config";

fs.mkdirSync(path.join(__dirname, "../raw"), { recursive: true });
fs.mkdirSync(path.join(__dirname, "../transcoded/"), { recursive: true });

async function downloadVideo() {
  const getCommand = new GetObjectCommand(params);
  const data = await s3Client.send(getCommand);

  const destinationPath = path.join(__dirname, "../raw/") + params.Key;

  await new Promise(function (resolve, reject) {
    const body = data.Body;

    if (!(body instanceof Readable)) {
      console.log("Body is not type of readable");
      reject(0);
    }

    const writeStream = fs.createWriteStream(destinationPath);
    (body as Readable)
      .pipe(writeStream)
      .on("data", (chunk) => {
        console.log("Streaming data chunk:", chunk);
      })
      .on("error", (err) => reject(err))
      .on("close", () => resolve(null));

    console.log("Download completed");
  });
}

downloadVideo().then(async () => {
  transcodeVideo();
});
