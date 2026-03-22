import type { Response } from "express";
import { getChildren } from "../services/children.service";
import type { AuthRequest } from "../middleware/auth.middleware";
import { getParent } from "../services/parent.service";

export async function getChildrenController(req: AuthRequest, res: Response) {
  try {
    const parent = await getParent(req.userId as string);
    console.log(parent);
    const familyId = parent?.familyId as string;

    if (!familyId) res.json([]);
    const children = await getChildren(familyId);

    res.json(children);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}
