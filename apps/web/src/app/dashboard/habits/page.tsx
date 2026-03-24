"use client";

import { useEffect, useState } from "react";
import { socket } from "../../../../utils/socket";
import HabitCard from "../components/habits/HabitTracker";
import { useAuthStore } from "../../../../store/useStore";
import api from "@/lib/api";
import { toast } from "sonner";

const habitsRecords: Record<string, number> = {
  water: 0,
  fruits: 0,
  activity: 0,
  screen: 0,veggies:0
};

const icons: Record<string, string> = {
  water: "💧",
  fruits: "🍎",
  activity: "🏃",
  screen: "📱",veggies: "🍎",
};
export default function HabitsPage() {
  const [habits, setHabits] = useState(habitsRecords);
  const [loading, setLoading] = useState(false);

  const familyId = useAuthStore((state) => state.parent?.familyId) as string;

  const fetchHabits = async () => {
    try {
      const res = await api.get("/children/habits/today");
      console.log(res.data);
      setHabits(res.data);
    } catch (err: any) {
      toast.error(err.response.data.message);
    } finally {
    }
  };

  // Join socket room
  useEffect(() => {
    if (!socket) return;
    socket.emit("join_family", familyId);

    socket.on("habit_updated", (data) => {
      setHabits(data);
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
    habits[type] = (habits[type] || 0) + 1;

    try {
      setLoading(true);
      const res = await api.post("/children/habits", habits);
      setHabits(res.data); // instant UI
    } catch (err: any) {
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
