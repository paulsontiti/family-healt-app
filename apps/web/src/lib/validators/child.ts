// lib/validators/child.ts
import { z } from "zod";

export const childSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  age: z
    .number("Age is required")
    .min(0, "Invalid age")
    .max(18, "Child must be under 18"),
  gender: z.enum(["Male", "Female"]),
  weight: z
    .number("Weight is required" )
    .min(1, "Invalid weight"),
  height: z
    .number("Height is required" )
    .min(30, "Invalid height"),
    
});