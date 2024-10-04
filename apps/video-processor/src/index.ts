import dotenv from "dotenv";
import { ReceiveMessageCommand, SQSClient } from "@aws-sdk/client-sqs";

dotenv.config();

const sqsClient = new SQSClient({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const params = {
  QueueUrl: process.env.AWS_SQS_QUEUE_URL!,
  MaxNumberOfMessages: 10,
  VisibilityTimeout: 30,
  WaitTimeSeconds: 20,
};

async function init() {
  while (true) {
    const command = new ReceiveMessageCommand(params);
    const response = await sqsClient.send(command);
    console.log(response);
    // spin container on ecs fargate
  }
}

init();
