import { createChildRepo, getChildrenRepo } from "../repositories/children.repo";
export async function getChildren(familyId) {
    try {
        return await getChildrenRepo(familyId);
    }
    catch (err) {
        throw new Error(err.message);
    }
}
export async function createChild(data) {
    try {
        return await createChildRepo(data);
    }
    catch (err) {
        throw new Error(err.message);
    }
}
//# sourceMappingURL=children.service.js.map