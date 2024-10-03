import { S3Client } from "@aws-sdk/client-s3";

const config = {
  region: "eu-north-1",
  credentials: {
    accessKeyId: "",
    secretAccessKey: "",
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
