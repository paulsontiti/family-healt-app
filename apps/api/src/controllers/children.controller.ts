import type { Response } from "express";
import { createChild, getChildren } from "../services/children.service";
import type { AuthRequest } from "../middleware/auth.middleware";
import { getParent } from "../services/parent.service";
import type { ChildCreateInput } from "@repo/types";

export async function getChildrenController(req: AuthRequest, res: Response) {
  try {
    const parent = await getParent(req.userId as string);
    const familyId = parent?.familyId as string;
   
    if (!familyId) {
      res.json([]);
    } else {
      const children = await getChildren(familyId);

      res.json(children);
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}

export async function createChildController(req: AuthRequest, res: Response) {
  try {
    const data: ChildCreateInput = req.body;
    await createChild(data);

    res.json({ message: "Child created successfully" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}
