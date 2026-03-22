import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../../prisma/client";

export interface AuthRequest extends Request {
  userId?: string;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1] as string;

  try {
    const secret = process.env.JWT_SECRET!;
    const payload: any = jwt.verify(token, secret);

    // Fetch the user from DB
    const parent = await prisma.parent.findUnique({
      where: { id: payload.parentId },
    });

    if (!parent) return res.status(401).json({ error: "Unauthorized" });

    req.userId = parent.id; // attach user to request
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid token" });
  }
};
