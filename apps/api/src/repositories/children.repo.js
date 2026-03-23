import prisma from "../../prisma/client";
export async function getChildrenRepo(familyId) {
    try {
        return await prisma.child.findMany({
            where: { familyId },
            include: { habits: true, family: true },
        });
    }
    catch (err) {
        throw new Error(err.message);
    }
}
//# sourceMappingURL=children.repo.js.map