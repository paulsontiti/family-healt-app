import express from "express";
import cors from "cors";
import morgan from "morgan";
import childrenRouter from "./routes/children.route";
import habitsRouter from "./routes/habits.route";
import challengesRouter from "./routes/challenges.route";
import tipsRouter from "./routes/tips.route";
import authRouter from "./routes/auth.route";
import familyRouter from "./routes/family.route";
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
// Routes
app.use("/api/auth", authRouter);
app.use("/api/children", childrenRouter);
app.use("/api/habits", habitsRouter);
app.use("/api/challenges", challengesRouter);
app.use("/api/tips", tipsRouter);
app.use("/api/families", familyRouter);
// Health check
app.get("/", (_req, res) => res.send("Family Health API is running ✅"));
app.get("/", (_, res) => {
    res.send("API is running 🚀 (ESM)");
});
export default app;
//# sourceMappingURL=app.js.map