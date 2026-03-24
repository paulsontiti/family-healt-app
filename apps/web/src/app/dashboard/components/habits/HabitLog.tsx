"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { toast } from "sonner";
import { socket } from "../../../../../utils/socket";
import HabitCard from "./HabitTracker";

const habitsRecords: Record<string, number> = {
  water: 0,
  fruits: 0,
  activity: 0,
  screen: 0,
};

const icons: Record<string, string> = {
  water: "💧",
  fruits: "🍎",
  activity: "🏃",
  screen: "📱",
  veggies:"🍎"
};
export default function HabitLogs({familyId,idChild}:{familyId:string,idChild:string}) {
  const [loading, setLoading] = useState(false);
  const [todayHabits,setTodayHabit] = useState(habitsRecords)

  const fetchHabits = async () => {
    try {
      const res = await api.get(`/children/habits/today/${idChild}`);
    
      setTodayHabit(res.data);
    } catch (err: any) {
      toast.error(err.response.data.message);
    } finally {
    }
  };

  // Join socket room
  useEffect(() => {
    if (!socket) return;
    socket.emit("join_family", familyId);

    socket.on("habit_updated", (data:any) => {
      setTodayHabit(data);
    });

    return () => {
      socket.off("habit_updated");
    };
  }, []);

  // Fetch today's habits
  useEffect(() => {
    fetchHabits();
  }, []);

  // 1-tap update
  const updateHabit = async (type: string) => {
    todayHabits[type] = (todayHabits[type] || 0) + 1;

    try {
      setLoading(true);
      const res = await api.post("/children/habits", todayHabits);
      setTodayHabit(res.data); // instant UI
    } catch (err: any) {
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const {id,childId,createdAt,updatedAt,...habits} = todayHabits
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
      {Object.entries(habits).map((habit) => {
        const key = habit[0];
        return (
          <HabitCard
            key={key}
            label={`${key[0].toUpperCase()}${key.slice(1)}`}
            value={habit[1]}
            icon={icons[key]}
            onClick={() => updateHabit(key)}
          />
        );
      })}
      {loading && <p className="text-white">updating...</p>}
    </div>
  );
}
