import http from "node:http";
import WebSocket, { WebSocketServer } from "ws";

import { LiveStreamManager } from "./modules/LiveStreamManager.js";
import { IncomingMessage, IncomingMessageType, OutgoingMessage, OutgoingMessageType } from "./types.js";

const server = http.createServer();
const wss = new WebSocketServer({ server });

const streamManager = new LiveStreamManager();

wss.on("connection", (ws) => {
  ws.on("error", console.error);
  ws.on("message", (data) => hanlder(ws, data));
});

async function hanlder(ws: WebSocket, data: WebSocket.RawData) {
  const message = JSON.parse(data.toString()) as IncomingMessage;

  if (message.type === IncomingMessageType.JoinStream) {
    const { id, name, streamId } = message.payload;
    streamManager.addUser(id, name, ws, streamId);

    const event: OutgoingMessage = {
      type: OutgoingMessageType.System,
      payload: { name },
    };

    streamManager.broadcast(streamId, event);
  }

  if (message.type === IncomingMessageType.SendMessage) {
    const { id, name, content, streamId } = message.payload;

    const event: OutgoingMessage = {
      type: OutgoingMessageType.User,
      payload: { id, name, content },
    };

    streamManager.broadcast(streamId, event);
  }
}

server.listen(8080, () => {
  console.log("Server started at 8080");
});
