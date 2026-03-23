import { getParentRepo } from "../repositories/auth.repo";
import { updateParentRepo } from "../repositories/parent.repo";
export async function getParent(id) {
    try {
        return await getParentRepo(id);
    }
    catch (err) {
        throw new Error(err.message);
    }
}
export async function updateParent(id, data) {
    try {
        return await updateParentRepo(id, data);
    }
    catch (err) {
        throw new Error(err.message);
    }
}
//# sourceMappingURL=parent.service.js.map