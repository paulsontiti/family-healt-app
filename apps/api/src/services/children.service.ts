import { getChildrenRepo } from "../repositories/children.repo";

export async function getChildren(familyId:string) {
    try{
        return await getChildrenRepo(familyId)
    }catch(err:any){
        throw new Error(err.message)
    }
}