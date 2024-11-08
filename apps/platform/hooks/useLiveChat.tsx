"use client";

import React, { useState } from "react";

import { IncomingMessage, IncomingMessageType, OutgoingMessage, OutgoingMessageType } from "@/types";

const useLiveChat = (setChats: React.Dispatch<React.SetStateAction<IncomingMessage[]>>, id: string, name: string, streamId: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const websocketUrl = process.env.NODE_ENV === "production" ? "ws://chat.youtube.mehuls.in" : "ws://localhost:8080";

  function connect() {
    const socket = new WebSocket(websocketUrl);

    socket.onopen = () => {
      const message: IncomingMessage = {
        type: IncomingMessageType.JoinStream,
        payload: {
          id: id,
          name: name,
          streamId: streamId,
        },
      };

      socket.send(JSON.stringify(message));
      setSocket(socket);
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data) as OutgoingMessage;

      if (message.type === OutgoingMessageType.System) {
        setChats((p) => [
          ...p,
          {
            payload: {
              id: id,

              name: message.payload.name,
              streamId: streamId,
            },
            type: IncomingMessageType.JoinStream,
          },
        ]);
      }

      if (message.type === OutgoingMessageType.User) {
        setChats((p) => [
          ...p,
          {
            payload: {
              id: message.payload.id,
              name: message.payload.name,
              content: message.payload.content,
              streamId: streamId,
            },
            type: IncomingMessageType.SendMessage,
          },
        ]);
      }
    };

    socket.onerror = () => setSocket(null);
  }

  return { socket, connect };
};

export default useLiveChat;
