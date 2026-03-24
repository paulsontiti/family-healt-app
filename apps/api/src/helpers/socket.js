import { Server } from "socket.io";
export default function initSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: "*",
        },
    });
    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);
        // Join family room
        socket.on("join_family", (familyId) => {
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
    return io;
}
//# sourceMappingURL=socket.js.map