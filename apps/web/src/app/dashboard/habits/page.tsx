"use client";

import { useEffect, useState } from "react";
import { socket } from "../../../../utils/socket";
import HabitCard from "../components/habits/HabitTracker";

const API = "http://localhost:5000";

const habitsRecords: Record<string, number> = {
  water: 0,
  fruits: 0,
  activity: 0,
  screen: 0,
};

export default function HabitsPage() {
  const [habits, setHabits] = useState(habitsRecords);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const familyId = "YOUR_FAMILY_ID"; // replace dynamically

  // Join socket room
  useEffect(() => {
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
    fetch(`${API}/habits/today`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setHabits);
  }, []);

  // 1-tap update
  const updateHabit = async (type: string) => {
    const updated = { ...habits, type: habits[type] + 1 };
    setHabits(updated); // instant UI

    await fetch(`${API}/habits`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updated),
    });
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <HabitCard
        label="Water"
        icon="💧"
        value={habits.water}
        onClick={() => updateHabit("water")}
      />
      <HabitCard
        label="Fruits"
        icon="🍎"
        value={habits.fruits}
        onClick={() => updateHabit("fruits")}
      />
      <HabitCard
        label="Activity"
        icon="🏃"
        value={habits.activity}
        onClick={() => updateHabit("activity")}
      />
      <HabitCard
        label="Screen"
        icon="📱"
        value={habits.screen}
        onClick={() => updateHabit("screen")}
      />
    </div>
  );
}
