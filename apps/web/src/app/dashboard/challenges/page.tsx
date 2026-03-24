"use client";

import { useEffect, useState } from "react";
import { socket } from "../../../../utils/socket";
import ChallengeCard from "../components/challenges/ChallengeCard";
import { toast } from "sonner";
import api from "@/lib/api";

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState([]);

  const fetchChallenges = async () => {
    try {
      const res = await api.get("/challenges");
      setChallenges(res.data);
    } catch (err: any) {
      console.log(err.response.data.message)
      toast.error(err.response.data.message);
    }
  };
  useEffect(() => {
    fetchChallenges();
    // fetch("http://localhost:5000/challenges")
    //   .then(res => res.json())
    //   .then(setChallenges);

    // socket.on("challenge_updated", () => {
    //   location.reload(); // quick refresh (can optimize later)
    // });

    //return () => socket.off("challenge_updated");
  }, []);

  if(!challenges) return null
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {challenges.map((c: any) => (
        <ChallengeCard key={c.id} challenge={c} />
      ))}
    </div>
  );
}
