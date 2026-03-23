"use client";

import { useEffect, useState } from "react";
import { socket } from "../../../../utils/socket";
import ChallengeCard from "../components/challenges/ChallengeCard";

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    // fetch("http://localhost:5000/challenges")
    //   .then(res => res.json())
    //   .then(setChallenges);

    // socket.on("challenge_updated", () => {
    //   location.reload(); // quick refresh (can optimize later)
    // });

    // return () => socket.off("challenge_updated");
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {challenges.map((c: any) => (
        <ChallengeCard key={c.id} challenge={c} />
      ))}
    </div>
  );
}