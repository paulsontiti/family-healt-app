import prisma from "../../prisma/client";
import type { ParentCreateInput } from "@repo/types";

export async function createParentRepo(data: ParentCreateInput) {
  return await prisma.parent.create({
    data,
  });
}

export async function getParentRepo(id: string) {
  return await prisma.parent.findUnique({ where: { id } });
}
export async function getParentEmailRepo(email: string) {
  return await prisma.parent.findUnique({ where: { email } });
}