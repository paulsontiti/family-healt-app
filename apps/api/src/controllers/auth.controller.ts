import type { Request, Response } from "express";

import jwt from "jsonwebtoken";
import prisma from "../../prisma/client";
import { hashPassword, comparePasswords } from "../utils/bcrypt.utils";
import {
  createParent,
  getParent,
  getParentEmail,
} from "../services/auth.service";

export const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await hashPassword(password);

      const parent = await createParent({
        name,
        email,
        password: hashedPassword,
      });
      const token = jwt.sign({ parentId: parent.id }, process.env.JWT_SECRET!, {
        expiresIn: "7d",
      });

      res.status(201).json({
        parent: {
          id: parent.id,
          email: parent.email,
          familyId: parent.familyId,
          name: parent.name,
        },
        token,
      });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const parent = await getParentEmail(email);
      if (!parent)
        return res.status(401).json({ error: "Invalid credentials" });

      const valid = await comparePasswords(password, parent.password);
      if (!valid) return res.status(401).json({ error: "Invalid credentials" });

      const token = jwt.sign({ parentId: parent.id }, process.env.JWT_SECRET!, {
        expiresIn: "7d",
      });

      res.json({
        parent: {
          id: parent.id,
          email: parent.email,
          familyId: parent.familyId,
          name: parent.name,
        },
        token,
      });
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  },
};
