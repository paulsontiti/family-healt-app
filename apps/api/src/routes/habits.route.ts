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
  const {data} = req.body;
  const habit = await prisma.habitLog.upsert({
    where:{id:data.id as string},
    update:data,
    create:data,
    // include: { child: true },
  });

  const familyId = data.familyId as string;

  // Emit via global io (we'll attach it)
  req.app.get("io").to(familyId).emit("habit_updated", habit);
  res.status(201).json(habit);
});

habitsRouter.get("/today", async (req, res) => {
 
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const habit = await prisma.habitLog.findFirst({
    where: {
      createdAt: { gte: today },
    },
  });

  res.json(
    habit || {
      water: 0,
      fruits: 0,
      activity: 0,
      screen: 0,
    }
  );
});

export default habitsRouter;
