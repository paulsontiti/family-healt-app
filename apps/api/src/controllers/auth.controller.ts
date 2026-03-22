import type { Request, Response } from "express";

import jwt from "jsonwebtoken";
import prisma from "../../prisma/client";
import { hashPassword, comparePasswords } from "../utils/bcrypt.utils";
import { createParent, getParent } from "../services/auth.service";

export const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await hashPassword(password);

      const user = await createParent({
        name,
        email,
        password: hashedPassword,
      });
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
        expiresIn: "7d",
      });
      res.status(201).json({ user: { id: user.id, email: user.email }, token });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const parent = await getParent(email);
      if (!parent)
        return res.status(401).json({ error: "Invalid credentials" });

      const valid = await comparePasswords(password, parent.password);
      if (!valid) return res.status(401).json({ error: "Invalid credentials" });

      const token = jwt.sign({ parentId: parent.id }, process.env.JWT_SECRET!, {
        expiresIn: "7d",
      });

      res.json({
        parent: { id: parent.id, email: parent.email },
        token,
      });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
};
