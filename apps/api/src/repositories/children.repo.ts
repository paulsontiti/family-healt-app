import prisma from "../../prisma/client";

export async function getChildrenRepo(familyId:string) {
    try{
        return await prisma.child.findMany({
            where:{familyId},
    include: { habits: true, family: true },
  });
    }catch(err:any){
        throw new Error(err.message)
    }
}