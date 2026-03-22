import prisma from "../../prisma/client";

export async function getChallengesRepo() {
  try {
    return await prisma.challenge.findMany({ include: { family: true } });
  } catch (err: any) {
    return null;
  }
}
