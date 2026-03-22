import { createFamilyRepo, getFamiliesRepo } from "../repositories/family.repo";

export async function getFamilies() {
  try {
    return await getFamiliesRepo();
  } catch (err: any) {
    throw new Error(err.message);
  }
}


export async function createFamily(parentId:string,name:string) {
  try {
    return await createFamilyRepo(parentId,name);
  } catch (err: any) {
    throw new Error(err.message);
  }
}