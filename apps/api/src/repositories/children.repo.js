import prisma from "../../prisma/client";
export async function getChildrenRepo(familyId) {
    try {
        console.log(familyId);
        return await prisma.child.findMany({
            where: { familyId },
            include: { habits: true, growthLogs: true },
        });
    }
    catch (err) {
        throw new Error(err.message);
    }
}
export async function createChildRepo(data) {
    try {
        const child = await prisma.child.create({
            data,
        });
        if (child) {
            await prisma.habitLog.create({ data: { childId: child.id } });
        }
    }
    catch (err) {
        throw new Error(err.message);
    }
}
//# sourceMappingURL=children.repo.js.map