import WebSocket from "ws";
import { OutgoingMessage } from "../types.js";

interface User {
  id: string;
  name: string;
  socket: WebSocket;
}

interface Stream {
  users: User[];
}

export class LiveStreamManager {
  private streams: Map<string, Stream>;

  constructor() {
    this.streams = new Map<string, Stream>();
  }

  public addUser(id: string, name: string, socket: WebSocket, streamId: string) {
    const stream = this.streams.get(streamId) || { users: [] };
    stream.users.push({ id, name, socket });

    this.streams.set(streamId, stream);

    socket.on("close", () => {
      this.streams.get(streamId)?.users.filter((user) => user.id !== id);
    });
  }

  public broadcast(streamId: string, message: OutgoingMessage) {
    const stream = this.streams.get(streamId);

    if (!stream) {
      console.error("Stream does not exist");
      return;
    }

    stream.users.map(({ socket }) => {
      socket.send(JSON.stringify(message), { binary: false });
    });
  }
}
