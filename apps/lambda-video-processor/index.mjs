import { ECSClient, RunTaskCommand } from "@aws-sdk/client-ecs";

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
      securityGroups: ["sg-0ccd48e91e7d36e74"],
      subnets: ["subnet-08a3fdff2aaccdeb3"],
    },
  },
  overrides: {
    containerOverrides: [
      {
        name: process.env.AWS_ECS_CONTAINER_NAME,
        environment: [
          {
            name: "VIDEO_KEY",
            value: "", // inserted by handler
          },
          {
            name: "AWS_SQS_MESSAGE_RECEIPT_HANDLE",
            value: "", // inserted by handler
          },
          {
            name: "AWS_S3_SOURCE_BUCKET_NAME",
            value: process.env.AWS_S3_SOURCE_BUCKET_NAME,
          },
          {
            name: "AWS_S3_DESTINATION_BUCKET_NAME",
            value: process.env.AWS_S3_DESTINATION_BUCKET_NAME,
          },
          {
            name: "AWS_SQS_QUEUE_URL",
            value: process.env.AWS_SQS_QUEUE_URL,
          },
        ],
      },
    ],
  },
};

export const handler = async (event) => {
  try {
    const s3Notification = JSON.parse(event.Records[0].body);
    const videoKey = s3Notification.Records[0].s3.object.key;
    const receiptHandle = event.Records[0].receiptHandle;

    params.overrides.containerOverrides[0].environment[0].value = videoKey;
    params.overrides.containerOverrides[0].environment[1].value = receiptHandle;

    const command = new RunTaskCommand(params);
    const response = await client.send(command);

    console.log(response);

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
