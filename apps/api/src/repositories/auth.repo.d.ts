import type { ParentCreateInput } from "@repo/types";
export declare function createParentRepo(data: ParentCreateInput): Promise<{
    id: string;
    name: string;
    email: string;
    password: string;
    familyId: string | null;
}>;
export declare function getParentRepo(email: string): Promise<{
    id: string;
    name: string;
    email: string;
    password: string;
    familyId: string | null;
} | null>;
//# sourceMappingURL=auth.repo.d.ts.map