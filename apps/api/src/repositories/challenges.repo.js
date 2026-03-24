import prisma from "../../prisma/client";
export async function getChallengesRepo() {
    try {
        return await prisma.challenge.findMany({ include: { family: true } });
    }
    catch (err) {
        throw new Error(err.message);
    }
}
//# sourceMappingURL=challenges.repo.js.map