import fsPromisified from "node:fs/promises";
import fs from "node:fs";
import path from "path";
import { PutObjectCommand } from "@aws-sdk/client-s3";

import { params, s3Client } from "./config";

async function uploadTranscodedVideos() {
  const destinationPath = path.join(__dirname, "../", "transcoded/");
  const files = await fsPromisified.readdir(destinationPath);

  const promises = files.map(async (file) => {
    const filePath = path.resolve(destinationPath, file);
    const command = new PutObjectCommand({ ...params, Body: fs.createReadStream(filePath) });
    await s3Client.send(command);
  });

  await Promise.all(promises);
}

export default uploadTranscodedVideos;
