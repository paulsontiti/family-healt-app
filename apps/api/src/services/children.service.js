import { getChildrenRepo } from "../repositories/children.repo";
export async function getChildren(familyId) {
    try {
        return await getChildrenRepo(familyId);
    }
    catch (err) {
        throw new Error(err.message);
    }
}
//# sourceMappingURL=children.service.js.map