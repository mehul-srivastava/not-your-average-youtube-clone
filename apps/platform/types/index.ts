import { Comment, LiveStream, Video } from "@prisma/client";

export type LiveStreamType = LiveStream;
export type VideoType = Video;
export type CommentType = Comment;

export type ApiGetSubscriptions =
  | {
      id: string;
      imageUrl: string;
    }[]
  | undefined;
