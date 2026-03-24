import { createParentRepo, getParentEmailRepo, getParentRepo } from "../repositories/auth.repo";
export async function createParent(data) {
    return await createParentRepo(data);
}
export async function getParent(id) {
    return await getParentRepo(id);
}
export async function getParentEmail(email) {
    return await getParentEmailRepo(email);
}
//# sourceMappingURL=auth.service.js.map