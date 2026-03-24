import { getParentRepo } from "../repositories/auth.repo";
import { updateParentRepo } from "../repositories/parent.repo";

export async function getParent(id: string) {
  try {

    return await getParentRepo(id);
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export async function updateParent(id: string, data: any) {
  try {
    return await updateParentRepo(id, data);
  } catch (err: any) {
    throw new Error(err.message);
  }
}
