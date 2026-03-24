import type { ChildCreateInput } from "@repo/types";
export declare function getChildrenRepo(familyId: string): Promise<({
    habits: {
        id: string;
        water: number;
        fruits: number;
        veggies: number;
        activity: number;
        screen: number;
        createdAt: Date;
        updatedAt: Date;
        childId: string;
    }[];
    growthLogs: {
        id: string;
        height: number;
        weight: number;
        childId: string;
        date: Date;
    }[];
} & {
    id: string;
    name: string;
    familyId: string;
    age: number;
    height: number;
    weight: number;
    gender: string;
})[]>;
export declare function createChildRepo(data: ChildCreateInput): Promise<void>;
//# sourceMappingURL=children.repo.d.ts.map