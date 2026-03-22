import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { createFamilyController, getFamiliesController } from '../controllers/family.controller';

const familyRouter = Router();

// GET /families - all families
familyRouter.get('/',authMiddleware, getFamiliesController);


// POST /families - create family
familyRouter.post('/',authMiddleware, createFamilyController);

export default familyRouter;