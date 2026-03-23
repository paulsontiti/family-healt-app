import { createParentRepo, getParentRepo } from "../repositories/auth.repo";
export async function createParent(data) {
    return await createParentRepo(data);
}
export async function getParent(email) {
    return await getParentRepo(email);
}
//# sourceMappingURL=auth.service.js.map