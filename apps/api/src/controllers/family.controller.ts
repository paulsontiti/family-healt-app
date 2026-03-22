import type { Request, Response } from "express";
import { createFamily, getFamilies } from "../services/family.service";
import type { AuthRequest } from "../middleware/auth.middleware";

export async function getFamiliesController(req: Request, res: Response) {
  try {
    const families = await getFamilies();

    res.json(families);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}

export async function createFamilyController(req: AuthRequest, res: Response) {
  try {
    const { name } = req.body;
    const parentId = req.userId as string;
    const family = await createFamily(parentId, name);

    res.json(family);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}
