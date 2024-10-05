import fsPromisified from "node:fs/promises";
import fs from "node:fs";
import path from "path";
import { PutObjectCommand } from "@aws-sdk/client-s3";

import { s3Client } from "./config";

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

  console.log("Uploading completed");
}

export default uploadTranscodedVideos;
