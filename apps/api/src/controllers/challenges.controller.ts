import type { Request, Response } from "express";
import { getChallenges } from "../services/challenges.service";

export async function getChallengesController(req: Request, res: Response) {
  try {
    
    const challenges = await getChallenges();

    res.json(challenges);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}
