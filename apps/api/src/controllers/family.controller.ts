import type { Request, Response } from "express";
import { createFamily, getFamilies } from "../services/family.service";
import type { AuthRequest } from "../middleware/auth.middleware";
import prisma from "../../prisma/client";
import { updateParent } from "../services/parent.service";

export async function getFamiliesController(req: Request, res: Response) {
  try {
    const families = await getFamilies();

    res.json(families);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}
export async function joinFamilyController(req: AuthRequest, res: Response) {
  try {
    const familyId = req.params.id as string;
    const parentId = req.userId as string;
    const parent = await updateParent(parentId, { familyId });

    res.json(parent);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}
export async function createFamilyController(req: AuthRequest, res: Response) {
  try {
    const { familyName } = req.body;
    const parentId = req.userId as string;
    const parent = await createFamily(parentId, familyName);
    const { password, ...parentObj } = parent;
    res.json(parentObj);
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
}

export const searchFamilies = async (req: Request, res: Response) => {
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

      if (count === 2) return false;
      return true;
    });
    // format response for frontend
    const formatted = filtered.map((family) => ({
      id: family.id,
      familyName: family.name,
    }));

    res.json(formatted);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to search families",
    });
  }
};
