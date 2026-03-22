import { Server } from "socket.io";
import app from "../app";

export default function initSocket(server: any) {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });
  app.set("io", io);
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Join family room
    socket.on("join_family", (familyId: string) => {
      socket.join(familyId);
      console.log(`Socket ${socket.id} joined family ${familyId}`);
    });

    // Habit update broadcast
    socket.on("habit_update", (data) => {
      const { familyId } = data;

      // Send to everyone in same family (except sender)
      socket.to(familyId).emit("habit_updated", data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
}
