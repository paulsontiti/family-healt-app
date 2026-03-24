import { getChallengesRepo } from "../repositories/challenges.repo";

export async function getChallenges() {
    try{
        return await getChallengesRepo();
    }catch(err:any){
        throw new Error(err.message)
    }
}