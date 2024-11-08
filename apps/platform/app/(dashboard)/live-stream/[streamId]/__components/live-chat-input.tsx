import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { SendIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import useLiveChat from "@/hooks/useLiveChat";
import { Input } from "@repo/shadcn/components/ui/input";
import { Button } from "@repo/shadcn/components/ui/button";
import { IncomingMessage, IncomingMessagePayload, IncomingMessageType } from "@/types";

const LiveChatInput = ({ setChats, streamId }: { streamId: string; setChats: React.Dispatch<React.SetStateAction<IncomingMessage[]>> }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { data } = useSession();

  if (!data?.user) {
    return (
      <Link href="/auth/identity?redirectTo=/">
        <Button className="w-full">Unlock Chat 🔓</Button>
      </Link>
    );
  }

  const { user } = data;
  const { socket, connect } = useLiveChat(setChats, user.id!, user.name!, streamId);

  function send() {
    if (!inputRef.current || !socket) {
      toast.error("You need to connect to the chat server!");
      return;
    }

    const message: IncomingMessage = {
      type: IncomingMessageType.SendMessage,
      payload: {
        id: user.id,
        name: user.name,
        streamId: "176c5f4c-aa5a-4bea-8ae3-ed6294fbb861",
        content: inputRef.current.value,
      } as IncomingMessagePayload & { content: string },
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
