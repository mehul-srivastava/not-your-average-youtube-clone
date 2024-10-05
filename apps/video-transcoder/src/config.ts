import { S3Client } from "@aws-sdk/client-s3";

export const params = {
  Bucket: process.env.BUCKET_NAME!,
  Key: process.env.KEY!,
};

export const s3Client = new S3Client({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});
