import prisma from "../../prisma/client";

export async function createHabitRepo(data: any) {
  try {
    return await prisma.child.create({
      data,
    });
  } catch (err: any) {
    throw new Error(err.message);
  }
}