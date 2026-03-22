import prisma from "../../prisma/client";
import { updateParent } from "../services/parent.service";

export async function getFamiliesRepo() {
  try {
    return await prisma.family.findMany({
      include: { parents: true, challenges: true, children: true },
    });
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function createFamilyRepo(
  parentId: string,
  name: string,
) {
  try {
    const family = await prisma.family.create({ data:{name} });
    await updateParent(parentId, { familyId: family.id });
  } catch (err: any) {
    throw new Error(err.message);
  }
}
