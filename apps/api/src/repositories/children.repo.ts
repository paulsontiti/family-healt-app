import type { ChildCreateInput } from "@repo/types";
import prisma from "../../prisma/client";

export async function getChildrenRepo(familyId: string) {
  try {
    console.log(familyId);
    return await prisma.child.findMany({
      where: { familyId },
      include: { habits: true, growthLogs: true },
    });
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function createChildRepo(data: ChildCreateInput) {
  try {
    const child = await prisma.child.create({
      data,
    });

    if (child) {
      await prisma.habitLog.create({ data: { childId: child.id } });
    }
  } catch (err: any) {
    throw new Error(err.message);
  }
}
