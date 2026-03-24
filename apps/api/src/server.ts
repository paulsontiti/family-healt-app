import { createServer } from "http";
import app from "./app.js";
import initSocket from "./helpers/socket.js";

const PORT = process.env.PORT;
const server = createServer(app);


// Attach Socket.IO
const io = initSocket(server);

// Make io accessible in routes
app.set("io", io);

server.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
