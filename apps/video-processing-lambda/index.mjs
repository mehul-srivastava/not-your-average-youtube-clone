import { ECSClient, RunTaskCommand } from "@aws-sdk/client-ecs";
import dotenv from "dotenv";

dotenv.config();

const client = new ECSClient({
  region: "eu-north-1",
});

const params = {
  cluster: process.env.AWS_ECS_CLUSTER_ARN,
  taskDefinition: process.env.AWS_ECS_TASK_DEFINITION_ARN,
  launchType: "FARGATE",
  networkConfiguration: {
    awsvpcConfiguration: {
      assignPublicIp: "ENABLED",
      securityGroups: ["sg-0115108e2baf6fab0"],
      subnets: [
        "subnet-073a9e8fbb5ccde3d",
        "subnet-08b5a974ad9b57669",
        "subnet-0259e841c4ac7df44",
        "subnet-0ea4eeb2af28461ad",
      ],
    },
  },
  overrides: {
    containerOverrides: [
      {
        name: process.env.AWS_ECS_CONTAINER_NAME,
        environment: [
          {
            name: "VIDEO_FOLDER",
            value: "", // inserted by handler
          },
          {
            name: "VIDEO_KEY",
            value: "", // inserted by handler
          },
          {
            name: "RECEIPT_HANDLE",
            value: "", // inserted by handler
          },
          {
            name: "BUCKET_NAME",
            value: process.env.AWS_S3_BUCKET_NAME,
          },
        ],
      },
    ],
  },
};

export const handler = async (event) => {
  try {
    const s3Notification = JSON.parse(event.Records[0].body);

    const completeFilePath = s3Notification.Records[0].s3.object.key.split("/");
    params.overrides.containerOverrides[0].environment[0].value = completeFilePath[0];
    params.overrides.containerOverrides[0].environment[1].value = completeFilePath[1];

    const receiptHandle = event.Records[0].receiptHandle;
    params.overrides.containerOverrides[0].environment[2].value = receiptHandle;

    const command = new RunTaskCommand(params);
    const response = await client.send(command);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Task command sent" }),
      response,
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: e.message }),
    };
  }
};
