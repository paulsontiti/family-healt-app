export declare function getFamiliesRepo(): Promise<({
    parents: {
        id: string;
        name: string;
        email: string;
        password: string;
        familyId: string | null;
    }[];
    children: {
        id: string;
        name: string;
        familyId: string;
        age: number;
        height: number;
        weight: number;
    }[];
    challenges: {
        id: string;
        familyId: string;
        title: string;
        description: string;
        target: number;
    }[];
} & {
    id: string;
    name: string;
})[]>;
export declare function createFamilyRepo(parentId: string, name: string): Promise<void>;
//# sourceMappingURL=family.repo.d.ts.map