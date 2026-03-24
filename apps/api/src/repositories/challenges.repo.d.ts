export declare function getChallengesRepo(): Promise<({
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
//# sourceMappingURL=challenges.repo.d.ts.map