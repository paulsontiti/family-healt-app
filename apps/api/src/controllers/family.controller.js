import { createFamily, getFamilies } from "../services/family.service";
export async function getFamiliesController(req, res) {
    try {
        const families = await getFamilies();
        res.json(families);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}
export async function createFamilyController(req, res) {
    try {
        const { name } = req.body;
        const parentId = req.userId;
        const family = await createFamily(parentId, name);
        res.json(family);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}
//# sourceMappingURL=family.controller.js.map