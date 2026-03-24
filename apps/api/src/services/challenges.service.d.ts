export declare function getChallenges(): Promise<({
    family: {
        id: string;
        name: string;
    };
} & {
    id: string;
    familyId: string;
    title: string;
    description: string;
    target: number;
    habitType: import("@prisma/client").$Enums.HabitType;
})[]>;
//# sourceMappingURL=challenges.service.d.ts.map