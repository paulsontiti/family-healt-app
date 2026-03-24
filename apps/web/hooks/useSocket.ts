"use client";

import { useEffect } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket;

export default function useSocket() {
  useEffect(() => {
    socket = io(process.env.NEXT_SOCKET_URL!, {
      withCredentials: true,
      transports: ["websocket"],
    });
    
    return () => {
      socket.disconnect();
    };
  }, []);

  return socket;
}
