import type { Request, Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware";
export declare function getFamiliesController(req: Request, res: Response): Promise<void>;
export declare function joinFamilyController(req: AuthRequest, res: Response): Promise<void>;
export declare function createFamilyController(req: AuthRequest, res: Response): Promise<void>;
export declare const searchFamilies: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=family.controller.d.ts.map