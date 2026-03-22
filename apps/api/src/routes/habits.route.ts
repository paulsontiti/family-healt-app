import { Router } from 'express';
import prisma from '../../prisma/client';
import { authMiddleware } from '../middleware/auth.middleware';

const habitsRouter = Router();

// GET /habits - all habit logs
habitsRouter.get('/',authMiddleware, async (_req, res) => {
  const habits = await prisma.habitLog.findMany({ include: { child: true } });
  res.json(habits);
});

// POST /habits - create habit log
habitsRouter.post('/',authMiddleware, async (req, res) => {
  const data = req.body;
  const habit = await prisma.habitLog.create({ data });
  res.status(201).json(habit);
});

export default habitsRouter;