import dotenv from "dotenv";
import path from "node:path";
import { S3Client } from "@aws-sdk/client-s3";
import { SQSClient } from "@aws-sdk/client-sqs";

dotenv.config();

const fullVideoKey = process.env.VIDEO_KEY!;

export const videoSuperdata = {
  Bucket: process.env.AWS_S3_SOURCE_BUCKET_NAME!,
  Folder: fullVideoKey.split("/")[0]!,
  Key: fullVideoKey.split("/")[1]!,
};

export const paths = {
  origin: path.join(__dirname, "../raw/"),
  destination: path.join(__dirname, "../transcoded/"),
};

export const bitrates = [
  { bitrate: "200k", dimensions: "256:144" },
  { bitrate: "600k", dimensions: "640:360" },
  { bitrate: "1200k", dimensions: "1280:720" },
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
