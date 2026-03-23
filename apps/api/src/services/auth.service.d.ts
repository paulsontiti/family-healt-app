import type { ParentCreateInput } from "@repo/types";
export declare function createParent(data: ParentCreateInput): Promise<{
    id: string;
    name: string;
    email: string;
    password: string;
    familyId: string | null;
}>;
export declare function getParent(email: string): Promise<{
    id: string;
    name: string;
    email: string;
    password: string;
    familyId: string | null;
} | null>;
//# sourceMappingURL=auth.service.d.ts.map