import type { ChildCreateInput } from "@repo/types";

import { createChildRepo, getChildrenRepo } from "../repositories/children.repo";

export async function getChildren(familyId:string) {
    try{
        return await getChildrenRepo(familyId)
    }catch(err:any){
        throw new Error(err.message)
    }
}

export async function createChild(data:ChildCreateInput) {
    try{
        return await createChildRepo(data)
    }catch(err:any){
        throw new Error(err.message)
    }
}