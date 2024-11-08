import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { SendIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import useLiveChat from "@/hooks/useLiveChat";
import { Input } from "@repo/shadcn/components/ui/input";
import { Button } from "@repo/shadcn/components/ui/button";
import { IncomingMessage, IncomingMessagePayload, IncomingMessageType, OutgoingMessage } from "@/types";

const LiveChatInput = ({ streamId, setChats }: { streamId: string; setChats: React.Dispatch<React.SetStateAction<OutgoingMessage[]>> }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { socket, handleConnection } = useLiveChat(setChats);
  const { data } = useSession();

  if (!data?.user) {
    return (
      <div className="flex items-center gap-2 rounded-b-[inherit] bg-[#000]">
        <div className="flex w-full items-center justify-between gap-4 p-3 px-4">
          <Link href="/auth/identity?redirectTo=/" className="w-full">
            <Button className="w-full opacity-50">Unlock Chat 🔓</Button>
          </Link>
        </div>
      </div>
    );
  }

  const { user } = data;

  function connect() {
    if (socket) {
      toast.error("You are already connected to the server!");
      return;
    }

    const socketInstance = handleConnection();
    const message: IncomingMessage = {
      type: IncomingMessageType.JoinStream,
      payload: {
        id: user.id!,
        name: user.name!,
        streamId: streamId,
      },
    };

    socketInstance.onopen = () => {
      socketInstance.send(JSON.stringify(message));
    };
  }

  function send() {
    if (!inputRef.current || !socket) {
      toast.error("You need to connect to the chat server!");
      return;
    }

    if (inputRef.current.value === "" || inputRef.current.value.length <= 0) {
      toast.error("Your input box is blank!");
      return;
    }

    const message: IncomingMessage = {
      type: IncomingMessageType.SendMessage,
      payload: {
        id: user.id!,
        name: user.name!,
        streamId: streamId,
        content: inputRef.current.value,
      } satisfies IncomingMessagePayload & { content: string },
    };

    socket.send(JSON.stringify(message));
    inputRef.current.value = "";
  }

  return (
    <div className="flex items-center gap-2 rounded-b-[inherit] bg-[#000]">
      <div className="flex w-full items-center justify-between gap-4 p-3 px-4">
        {socket ? (
          <>
            <Input className="grow" ref={inputRef} />
            <SendIcon className="h-6 w-6 cursor-pointer" onClick={send} />
          </>
        ) : (
          <Button className="w-full" onClick={connect}>
            Connect
          </Button>
        )}
      </div>
    </div>
  );
};

export default LiveChatInput;
