export declare function getFamiliesRepo(): Promise<({
    children: {
        id: string;
        name: string;
        familyId: string;
        age: number;
        height: number;
        weight: number;
        gender: string;
    }[];
    parents: {
        id: string;
        email: string;
        name: string;
        password: string;
        familyId: string | null;
    }[];
    challenges: {
        id: string;
        familyId: string;
        title: string;
        description: string;
        target: number;
        habitType: import("@prisma/client").$Enums.HabitType;
    }[];
} & {
    id: string;
    name: string;
})[]>;
export declare function createFamilyRepo(parentId: string, name: string): Promise<{
    id: string;
    email: string;
    name: string;
    password: string;
    familyId: string | null;
}>;
//# sourceMappingURL=family.repo.d.ts.map