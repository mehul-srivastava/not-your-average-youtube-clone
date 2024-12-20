"use client";

import React, { useState } from "react";

import LiveChatContainer from "./live-chat-container";
import LiveChatInput from "./live-chat-input";
import { OutgoingMessage } from "@/types";

const LiveChat = ({ streamId }: { streamId: string }) => {
  const [chats, setChats] = useState<OutgoingMessage[]>([]);

  return (
    <>
      <div className="absolute left-0 top-0 w-full">
        <div className="absolute left-0 top-0 z-20 flex w-full items-center gap-2 rounded-t-[inherit] bg-[#000]">
          <div className="flex items-center gap-2 p-3 px-4">
            <span className="bg-destructive block h-2 w-2 rounded-full" />
            <span>Live Chat</span>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 overflow-y-auto px-6 py-4 lg:block">
        <LiveChatContainer chats={chats} />
      </div>
      <div className="absolute bottom-0 left-0 w-full">
        <LiveChatInput setChats={setChats} streamId={streamId} />
      </div>
    </>
  );
};

export default LiveChat;
