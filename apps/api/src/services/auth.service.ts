
import type { ParentCreateInput } from "@repo/types";
import { createParentRepo, getParentRepo } from "../repositories/auth.repo";

export async function createParent(data:ParentCreateInput) {
    return await createParentRepo(data);
}

export async function getParent(email:string) {
    return await getParentRepo(email)
}