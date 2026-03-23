import { createFamilyRepo, getFamiliesRepo } from "../repositories/family.repo";
export async function getFamilies() {
    try {
        return await getFamiliesRepo();
    }
    catch (err) {
        throw new Error(err.message);
    }
}
export async function createFamily(parentId, name) {
    try {
        return await createFamilyRepo(parentId, name);
    }
    catch (err) {
        throw new Error(err.message);
    }
}
//# sourceMappingURL=family.service.js.map