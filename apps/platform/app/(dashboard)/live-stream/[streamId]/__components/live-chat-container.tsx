import React from "react";
import { CircleUserIcon } from "lucide-react";

interface IChat {
  authorId: number;
  message: string;
  createdAt: Date;
  type: string;
}

const LiveChatContainer = ({ chats }: { chats: IChat[] }) => {
  console.log(chats);
  return (
    <div className="flex flex-col gap-2 pb-16 pt-12">
      {chats.map((chat) => {
        if (chat.type === "me") {
          return (
            <p className="my-2 ml-auto w-fit max-w-[75%] break-words rounded-t-md rounded-bl-md bg-gray-500 p-2 text-sm">
              {chat.message}
            </p>
          );
        }

        if (chat.type === "other") {
          return (
            <p className="my-2 w-fit max-w-[75%] break-words rounded-t-md rounded-bl-md bg-gray-700 p-2 text-sm">
              {chat.message}
            </p>
          );
        }

        if (chat.type === "system") {
          return (
            <p className="mx-auto flex items-center gap-2 text-center text-sm text-gray-700">
              <CircleUserIcon className="h-4 w-4" />
              <span>Rahul joined the stream</span>
            </p>
          );
        }
      })}
    </div>
  );
};

export default LiveChatContainer;
