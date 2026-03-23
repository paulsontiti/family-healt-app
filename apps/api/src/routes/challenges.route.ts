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

challengesRouter.post("/:id/join", async (req, res) => {
  const challengeId = req.params.id;
  const familyId =""//= req.user.familyId;

  const progress = await prisma.challengeProgress.create({
    data: {
      challengeId,
      familyId,
    },
  });

  res.json(progress);
});

challengesRouter.post("/:id/progress", async (req, res) => {
  const challengeId = req.params.id;

  const progress = await prisma.challengeProgress.findUnique({
    where: { challengeId },
  });

  const today = new Date();
  const last = progress?.lastUpdated;

  let newStreak = progress?.streak || 0;

  // 🧠 Streak Logic
  if (last) {
    const diff = Math.floor(
      (today.getTime() - new Date(last).getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diff === 1) {
      newStreak += 1; // consecutive day
    } else if (diff > 1) {
      newStreak = 1; // reset
    }
  } else {
    newStreak = 1;
  }

  const updated = await prisma.challengeProgress.update({
    where: { challengeId },
    data: {
      progress: { increment: 1 },
      streak: newStreak,
      lastUpdated: today,
    },
  });

  const io = req.app.get("io");
  io.to(updated.familyId).emit("challenge_updated", updated);

  res.json(updated);
});

export default challengesRouter;