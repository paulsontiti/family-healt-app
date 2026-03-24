import { getChallengesRepo } from "../repositories/challenges.repo";
export async function getChallenges() {
    try {
        return await getChallengesRepo();
    }
    catch (err) {
        throw new Error(err.message);
    }
}
//# sourceMappingURL=challenges.service.js.map