export declare function getChildrenRepo(familyId: string): Promise<({
    family: {
        id: string;
        name: string;
    };
    habits: {
        id: string;
        childId: string;
        date: Date;
        water: number;
        fruits: number;
        veggies: number;
        activity: number;
        screen: number;
    }[];
} & {
    id: string;
    name: string;
    familyId: string;
    age: number;
    height: number;
    weight: number;
})[]>;
//# sourceMappingURL=children.repo.d.ts.map