import { S3Client } from "@aws-sdk/client-s3";

const config = {
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
};

declare global {
  var s3Client: S3Client | undefined;
}

const s3Client = globalThis.s3Client || new S3Client(config);
if (process.env.NODE_ENV !== "production") globalThis.s3Client = s3Client;

export default s3Client;
