import { createServer } from "http";
import app from "./app.js";
import initSocket from "./helpers/socket.js";
const PORT = process.env.PORT;
const server = createServer(app);
initSocket(server);
server.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map