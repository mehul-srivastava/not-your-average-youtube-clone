"use client";
import React, { useEffect, useState } from "react";

import LiveChatContainer from "./live-chat-container";
import LiveChatHeader from "./live-chat-header";
import LiveChatInput from "./live-chat-input";

interface IChat {
  authorId: number;
  type: string; //  make this enum
  message: string;
  createdAt: Date;
}

const LiveChat = () => {
  const [chats, setChats] = useState<IChat[]>([]);
  return (
    <>
      <div className="absolute left-0 top-0 w-full">
        <LiveChatHeader />
      </div>
      <div className="absolute inset-0 overflow-y-auto px-6 py-4 lg:block">
        <LiveChatContainer chats={chats} />
      </div>
      <div className="absolute bottom-0 left-0 w-full">
        <LiveChatInput setChats={setChats} />
      </div>
    </>
  );
};

export default LiveChat;
