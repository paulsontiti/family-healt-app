import { createChild, getChildren } from "../services/children.service";
import { getParent } from "../services/parent.service";
export async function getChildrenController(req, res) {
    try {
        const parent = await getParent(req.userId);
        const familyId = parent?.familyId;
        if (!familyId) {
            res.json([]);
        }
        else {
            const children = await getChildren(familyId);
            res.json(children);
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}
export async function createChildController(req, res) {
    try {
        const data = req.body;
        await createChild(data);
        res.json({ message: "Child created successfully" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}
//# sourceMappingURL=children.controller.js.map