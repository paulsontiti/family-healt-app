import prisma from "../../prisma/client";
export async function getParentRepo(id) {
    try {
        return await prisma.parent.findUnique({
            where: { id },
        });
    }
    catch (err) {
        throw new Error(err.message);
    }
}
export async function updateParentRepo(id, data) {
    try {
        return await prisma.parent.update({
            where: { id },
            data,
        });
    }
    catch (err) {
        throw new Error(err.message);
    }
}
//# sourceMappingURL=parent.repo.js.map