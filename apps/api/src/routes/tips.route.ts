import { Router } from 'express';
import prisma from '../../prisma/client';

const tipsRouter = Router();

// GET /tips
tipsRouter.get('/', async (_req, res) => {
  const tips = await prisma.tip.findMany();
  res.json(tips);
});

// POST /tips
tipsRouter.post('/', async (req, res) => {
  const tip = await prisma.tip.create({ data: req.body });
  res.status(201).json(tip);
});

export default tipsRouter;