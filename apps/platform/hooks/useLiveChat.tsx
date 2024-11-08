"use client";

import React, { useState } from "react";

import { OutgoingMessage, OutgoingMessagePayload, OutgoingMessageType } from "@/types";

const useLiveChat = (setChats: React.Dispatch<React.SetStateAction<OutgoingMessage[]>>) => {
  const [socketState, setSocketState] = useState<WebSocket | null>(null);
  const websocketUrl = process.env.NODE_ENV === "production" ? "ws://chat.youtube.mehuls.in" : "ws://localhost:8080";

  function handleIncomingData(socket: WebSocket) {
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data) as OutgoingMessage;

      if (message.type === OutgoingMessageType.System) {
        const systemChat = {
          payload: {
            name: message.payload.name,
          } satisfies Pick<OutgoingMessagePayload, "name">,
          type: message.type,
        };

        setChats((p) => [...p, systemChat]);
      }

      if (message.type === OutgoingMessageType.User) {
        const userChat = {
          payload: {
            id: message.payload.id,
            name: message.payload.name,
            content: message.payload.content,
          } satisfies OutgoingMessagePayload,
          type: OutgoingMessageType.User,
        };

        setChats((p) => [...p, userChat]);
      }
    };

    socket.onerror = () => setSocketState(null);
  }

  function handleConnection() {
    const socket = new WebSocket(websocketUrl);
    handleIncomingData(socket);
    setSocketState(socket);
    return socket;
  }

  return { socket: socketState, handleConnection };
};

export default useLiveChat;
