import React from "react";
import { CircleUserIcon } from "lucide-react";
import { useSession } from "next-auth/react";

import { cn } from "@repo/shadcn/lib/utils";
import { OutgoingMessage, OutgoingMessageType } from "@/types";

const LiveChatContainer = ({ chats }: { chats: OutgoingMessage[] }) => {
  const session = useSession();

  return (
    <div className="flex flex-col gap-2 pb-16 pt-12">
      {chats.map((chat) => {
        if (chat.type === OutgoingMessageType.User) {
          return (
            <div
              className={cn(
                "my-2 w-fit max-w-[75%] break-words rounded-t-md rounded-bl-md p-2 text-sm",
                String(chat.payload.id) === session?.data?.user?.id! ? "ml-auto bg-gray-500" : "mr-auto bg-gray-700",
              )}
            >
              <p>{chat.payload.content}</p>
              <small className="text-xs text-gray-300">
                {chat.payload.name} ({new Date().toLocaleTimeString()})
              </small>
            </div>
          );
        }

        if (chat.type === OutgoingMessageType.System) {
          return (
            <p className="mx-auto flex items-center gap-2 text-center text-sm text-gray-700">
              <CircleUserIcon className="h-4 w-4" />
              <span>{chat.payload.name} joined the stream</span>
            </p>
          );
        }
      })}
    </div>
  );
};

export default LiveChatContainer;
