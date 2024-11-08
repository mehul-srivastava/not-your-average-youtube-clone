import { Comment, LiveStream, Video } from "@prisma/client";

export type LiveStreamType = LiveStream;
export type VideoType = Video;
export type CommentType = Comment;

export type OutgoingMessagePayload = {
  id: string;
  name: string;
  content: string;
};

export type IncomingMessagePayload = {
  id: string;
  name: string;
  streamId: string;
};

export enum OutgoingMessageType {
  User = "USER",
  System = "SYSTEM",
}

export enum IncomingMessageType {
  JoinStream = "JOIN_STREAM",
  SendMessage = "SEND_MESSAGE",
}

export type OutgoingMessage =
  | {
      type: OutgoingMessageType.System;
      payload: Pick<OutgoingMessagePayload, "name">;
    }
  | {
      type: OutgoingMessageType.User;
      payload: OutgoingMessagePayload;
    };

export type IncomingMessage =
  | {
      type: IncomingMessageType.JoinStream;
      payload: IncomingMessagePayload;
    }
  | {
      type: IncomingMessageType.SendMessage;
      payload: IncomingMessagePayload & { content: string };
    };
