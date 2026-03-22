import prisma from "../../prisma/client";

export async function getParentRepo(id: string) {
  try {
    return await prisma.parent.findUnique({
      where: { id },
    });
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function updateParentRepo(id: string, data: any) {
  try {
    return await prisma.parent.update({
      where: { id },
      data,
    });
  } catch (err: any) {
    throw new Error(err.message);
  }
}
