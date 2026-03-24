import { Router } from "express";
import prisma from "../../prisma/client";
import { authMiddleware } from "../middleware/auth.middleware";
import { createChildController, getChildrenController, } from "../controllers/children.controller";
const childrenRouter = Router();
// GET /children - list all children
childrenRouter.get("/", authMiddleware, getChildrenController);
// GET /children/:id - get single child
childrenRouter.get("/:id", authMiddleware, async (req, res) => {
    const child = await prisma.child.findUnique({
        where: { id: req.params.id },
        include: { habits: true, family: true, growthLogs: true },
    });
    res.json(child);
});
childrenRouter.get("/habits/today/:childId", authMiddleware, async (req, res) => {
    const childId = req.params.childId;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let habit = await prisma.habitLog.findFirst({
        where: {
            childId,
            createdAt: { gte: today },
        },
    });
    if (!habit) {
        habit = await prisma.habitLog.create({ data: { childId } });
    }
    res.json(habit);
});
// POST /habits - create habit log
childrenRouter.post("/habits", authMiddleware, async (req, res) => {
    try {
        const data = req.body;
        const { id, ...updateData } = data;
        const habit = await prisma.habitLog.upsert({
            where: { id: data.id },
            update: updateData,
            create: data,
            // include: { child: true },
        });
        const familyId = data.familyId;
        // Emit via global io (we'll attach it)
        const io = req.app.get("io");
        io.to(familyId).emit("habit_updated", habit);
        res.status(201).json(habit);
    }
    catch (err) {
        console.log(err);
    }
});
childrenRouter.post("/child", authMiddleware, createChildController);
childrenRouter.get("/weekly/:childId", async (req, res) => {
    const childId = req.params.childId;
    const logs = await prisma.habitLog.findMany({
        where: { childId },
        orderBy: { createdAt: "asc" },
        take: 7,
    });
    const formatted = logs.map((log) => ({
        date: new Date(log.createdAt).toLocaleDateString("en-US", {
            weekday: "short",
        }),
        water: log.water,
        fruits: log.fruits,
        activity: log.activity,
        screen: log.screen,
        veggies: log.veggies,
    }));
    res.json(formatted);
});
export default childrenRouter;
//# sourceMappingURL=children.route.js.map