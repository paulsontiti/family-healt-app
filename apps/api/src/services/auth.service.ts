
import type { ParentCreateInput } from "@repo/types";
import { createParentRepo, getParentEmailRepo, getParentRepo } from "../repositories/auth.repo";

export async function createParent(data:ParentCreateInput) {
    return await createParentRepo(data);
}

export async function getParent(id:string) {
    return await getParentRepo(id)
}
export async function getParentEmail(email:string) {
    return await getParentEmailRepo(email)
}