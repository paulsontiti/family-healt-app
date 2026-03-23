import { Router } from 'express';
import prisma from '../../prisma/client';
import { authMiddleware } from '../middleware/auth.middleware';
import { getChildrenController } from '../controllers/children.controller';
const childrenRouter = Router();
// GET /children - list all children
childrenRouter.get('/', authMiddleware, getChildrenController);
// GET /children/:id - get single child
childrenRouter.get('/:id', authMiddleware, async (req, res) => {
    const child = await prisma.child.findUnique({
        where: { id: req.params.id },
        include: { habits: true, family: true },
    });
    res.json(child);
});
export default childrenRouter;
//# sourceMappingURL=children.route.js.map