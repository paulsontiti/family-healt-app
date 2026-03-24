import prisma from "../../prisma/client";
import { updateParent } from "../services/parent.service";
export async function getFamiliesRepo() {
    try {
        return await prisma.family.findMany({
            include: { parents: true, challenges: true, children: true },
        });
    }
    catch (err) {
        throw new Error(err.message);
    }
}
export async function createFamilyRepo(parentId, name) {
    try {
        let familyExist = await prisma.family.findFirst({
            where: {
                name,
            },
        });
        const parent = await prisma.parent.findUnique({
            where: {
                id: parentId,
            },
            select: {
                family: true,
            },
        });
        if (familyExist) {
            throw new Error(`Family with the name:${name} already exist`);
        }
        if (parent?.family) {
            throw new Error(`You have already created a Family with the name:${parent.family.name}. You can't create more than one family`);
        }
        const family = await prisma.family.create({ data: { name } });
        return await updateParent(parentId, { familyId: family.id });
    }
    catch (err) {
        throw new Error(err.message);
    }
}
//# sourceMappingURL=family.repo.js.map