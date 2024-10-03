import { S3Client } from "@aws-sdk/client-s3";

const config = {
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
};

const global = globalThis as typeof globalThis & {
  s3Client: S3Client;
};

const s3Client = (() => {
  if (process.env.NODE_ENV === "production") {
    return new S3Client(config);
  } else {
    if (!global.s3Client) {
      global.s3Client = new S3Client(config);
    }

    return global.s3Client;
  }
})();

export default s3Client;
