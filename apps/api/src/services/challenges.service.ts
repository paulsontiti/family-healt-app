import { getChallengesRepo } from "../repositories/challenges.repo";

export async function getChallenges() {
    return await getChallengesRepo();
}