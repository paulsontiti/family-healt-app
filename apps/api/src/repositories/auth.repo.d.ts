import type { ParentCreateInput } from "@repo/types";
export declare function createParentRepo(data: ParentCreateInput): Promise<{
    id: string;
    email: string;
    name: string;
    password: string;
    familyId: string | null;
}>;
export declare function getParentRepo(id: string): Promise<{
    id: string;
    email: string;
    name: string;
    password: string;
    familyId: string | null;
} | null>;
export declare function getParentEmailRepo(email: string): Promise<{
    id: string;
    email: string;
    name: string;
    password: string;
    familyId: string | null;
} | null>;
//# sourceMappingURL=auth.repo.d.ts.map