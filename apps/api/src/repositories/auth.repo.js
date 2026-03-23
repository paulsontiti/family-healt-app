import prisma from "../../prisma/client";
export async function createParentRepo(data) {
    return await prisma.parent.create({
        data,
    });
}
export async function getParentRepo(email) {
    return await prisma.parent.findUnique({ where: { email } });
}
//# sourceMappingURL=auth.repo.js.map