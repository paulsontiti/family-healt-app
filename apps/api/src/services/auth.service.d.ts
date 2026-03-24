import type { ParentCreateInput } from "@repo/types";
export declare function createParent(data: ParentCreateInput): Promise<{
    id: string;
    email: string;
    name: string;
    password: string;
    familyId: string | null;
}>;
export declare function getParent(id: string): Promise<{
    id: string;
    email: string;
    name: string;
    password: string;
    familyId: string | null;
} | null>;
export declare function getParentEmail(email: string): Promise<{
    id: string;
    email: string;
    name: string;
    password: string;
    familyId: string | null;
} | null>;
//# sourceMappingURL=auth.service.d.ts.map