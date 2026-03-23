import { getChallenges } from "../services/challenges.service";
export async function getChallengesController(req, res) {
    try {
        const challenges = await getChallenges();
        res.json(challenges);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}
//# sourceMappingURL=challenges.controller.js.map