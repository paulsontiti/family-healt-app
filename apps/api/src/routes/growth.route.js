import { Router } from "express";
import prisma from "../../prisma/client";
const growthRouter = Router();
growthRouter.get("/:id/growth", async (req, res) => {
    const logs = await prisma.growthLog.findMany({
        where: { childId: req.params.id },
        orderBy: { date: "asc" },
    });
    res.json(logs);
});
growthRouter.post("/:id/growth", async (req, res) => {
    const log = await prisma.growthLog.create({
        data: {
            childId: req.params.id,
            weight: req.body.weight,
            height: req.body.height,
        },
    });
    const io = req.app.get("io");
    io.to(req.body.familyId).emit("growth_updated", log);
    res.json(log);
});
//# sourceMappingURL=growth.route.js.map