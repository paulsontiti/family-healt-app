"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

export default function ChallengeCard({ challenge }: any) {
  const progressPercent = (challenge.progress / challenge.target) * 100;

  const join = async () => {
    await fetch(`http://localhost:5000/challenges/${challenge.id}/join`, {
      method: "POST",
    });
  };

  const update = async () => {
    await fetch(`http://localhost:5000/challenges/${challenge.id}/progress`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ increment: 1 }),
    });
  };

  return (
    <motion.div whileHover={{ scale: 1.02 }}>
      <Card className="rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold">{challenge.title}</h2>
          <p className="text-gray-500 mb-4">{challenge.description}</p>

          {/* Progress */}
          <Progress value={progressPercent} />

          <div className="flex justify-between mt-4 text-sm">
            <span>🔥 Streak: {challenge.progress?.streak}</span>
            <span>{challenge.progress?.progress}/{challenge.target}</span>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 mt-4">
            <Button onClick={join}>Join</Button>
            <Button onClick={update} variant="secondary">
              + Progress
            </Button>
          </div>

          {/* Badges */}
          <div className="mt-4 flex gap-2">
            {challenge.progress?.streak >= 3 && <span>🥉</span>}
            {challenge.progress?.streak >= 5 && <span>🥈</span>}
            {challenge.progress?.streak >= 7 && <span>🥇</span>}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}