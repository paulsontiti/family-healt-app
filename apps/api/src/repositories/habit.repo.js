import prisma from "../../prisma/client";
export async function createHabitRepo(data) {
    try {
        return await prisma.child.create({
            data,
        });
    }
    catch (err) {
        throw new Error(err.message);
    }
}
//# sourceMappingURL=habit.repo.js.map