import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { createFamilyController, getFamiliesController, joinFamilyController, searchFamilies, } from "../controllers/family.controller";
const familyRouter = Router();
// GET /families - all families
familyRouter.get("/", authMiddleware, getFamiliesController);
// POST /families - create family
familyRouter.post("/", authMiddleware, createFamilyController);
familyRouter.get("/search", authMiddleware, searchFamilies);
familyRouter.post("/:id/join", authMiddleware, joinFamilyController);
export default familyRouter;
//# sourceMappingURL=family.route.js.map