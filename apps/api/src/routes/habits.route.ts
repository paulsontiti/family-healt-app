import { Router } from "express";
import prisma from "../../prisma/client";
import { authMiddleware } from "../middleware/auth.middleware";

const habitsRouter = Router();

// GET /habits - all habit logs
habitsRouter.get("/", authMiddleware, async (_req, res) => {
  const habits = await prisma.habitLog.findMany({ include: { child: true } });
  res.json(habits);
});

// POST /habits - create habit log
habitsRouter.post("/", authMiddleware, async (req, res) => {
  const data = req.body;
  const habit = await prisma.habitLog.create({
    data,
    include: { child: true },
  });

  const familyId = habit.child.familyId;

  // Emit via global io (we'll attach it)
  req.app.get("io").to(familyId).emit("habit_updated", habit);
  res.status(201).json(habit);
});

export default habitsRouter;
