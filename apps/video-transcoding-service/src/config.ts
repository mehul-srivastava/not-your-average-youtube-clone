import dotenv from "dotenv";
import path from "node:path";
import { S3Client } from "@aws-sdk/client-s3";
import { SQSClient } from "@aws-sdk/client-sqs";

dotenv.config();

export const args = {
  Bucket: process.env.BUCKET_NAME!,
  Folder: process.env.VIDEO_FOLDER!,
  Key: process.env.VIDEO_KEY!,
};

export const paths = {
  origin: path.join(__dirname, "../raw/"),
  destination: path.join(__dirname, "../transcoded/"),
};

export const bitrates = [
  { quality: "360p", bitrate: "1.5M" },
  // { quality: "480p", bitrate: "4M" },
  // { quality: "720p", bitrate: "7.5M" },
];

export const s3Client = new S3Client({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const sqsClient = new SQSClient({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});
