import { createFamily, getFamilies } from "../services/family.service";
import prisma from "../../prisma/client";
import { updateParent } from "../services/parent.service";
export async function getFamiliesController(req, res) {
    try {
        const families = await getFamilies();
        res.json(families);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}
export async function joinFamilyController(req, res) {
    try {
        const familyId = req.params.id;
        const parentId = req.userId;
        const parent = await updateParent(parentId, { familyId });
        res.json(parent);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}
export async function createFamilyController(req, res) {
    try {
        const { familyName } = req.body;
        const parentId = req.userId;
        const parent = await createFamily(parentId, familyName);
        const { password, ...parentObj } = parent;
        res.json(parentObj);
    }
    catch (err) {
        res.status(401).json({ message: err.message });
    }
}
export const searchFamilies = async (req, res) => {
    const { name } = req.query;
    if (!name || typeof name !== "string") {
        return res.status(400).json({
            message: "Search query 'name' is required",
        });
    }
    try {
        const families = await prisma.family.findMany({
            where: {
                name: {
                    contains: name,
                    mode: "insensitive", // case-insensitive search
                },
            },
            include: {
                _count: {
                    select: {
                        parents: true, // assuming relation is called "members"
                    },
                },
            },
            take: 10, // limit results
            orderBy: {
                name: "asc",
            },
        });
        // 🔥 Filter by parent count
        const filtered = families.filter((family) => {
            const count = family._count.parents;
            if (count === 2)
                return false;
            return true;
        });
        // format response for frontend
        const formatted = filtered.map((family) => ({
            id: family.id,
            familyName: family.name,
        }));
        res.json(formatted);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to search families",
        });
    }
};
//# sourceMappingURL=family.controller.js.map