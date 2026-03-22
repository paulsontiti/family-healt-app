import { Router } from 'express';
import prisma from '../../prisma/client';
import { authMiddleware } from '../middleware/auth.middleware';
import { getChallengesController } from '../controllers/challenges.controller';

const challengesRouter = Router();

// GET /challenges
challengesRouter.get('/', authMiddleware,getChallengesController);

// POST /challenges
challengesRouter.post('/', async (req, res) => {
  const data = req.body;
  const challenge = await prisma.challenge.create({ data });
  res.status(201).json(challenge);
});

export default challengesRouter;