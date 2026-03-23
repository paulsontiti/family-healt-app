import { getChildren } from "../services/children.service";
import { getParent } from "../services/parent.service";
export async function getChildrenController(req, res) {
    try {
        const parent = await getParent(req.userId);
        console.log(parent);
        const familyId = parent?.familyId;
        if (!familyId)
            res.json([]);
        const children = await getChildren(familyId);
        res.json(children);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}
//# sourceMappingURL=children.controller.js.map