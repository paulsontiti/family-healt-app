"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { Child } from "@repo/types";
import CreateFamilyForm from "./components/family/CreateFamilyForm";
import api from "@/lib/api";
import { useAuthStore } from "../../../store/useStore";
import { socket } from "../../../utils/socket";
import { toast } from "sonner";
import ChildCard from "./components/ChildCard";

export default function Dashboard() {
  const [children, setChildren] = useState<Child[]>([]);

  const familyId = useAuthStore((state) => state.parent?.familyId);

  const fetchChildren = async () => {
    const res = await api.get(`/children`);

    setChildren(res.data);
  };

  // // Join socket room
  // useEffect(() => {
  //   if (!socket) return;

  //   socket.emit("join_family", familyId);

  //   socket.on("habit_updated", (data) => {
  //     toast.success("Habit Updated");
  //     console.log(data);
  //   });

  //   return () => {
  //     socket.off("habit_updated");
  //   };
  // }, [socket]);
  useEffect(() => {
    fetchChildren();
  }, []);
  if (!familyId) return <CreateFamilyForm />;

  return (
    <div className="min-h-screen  p-6">
      {/* Header */}

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {["Water Intake 💧", "Active Minutes 🏃", "Screen Time 📱"].map(
          (item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="rounded-2xl shadow-md hover:shadow-xl transition">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-black">{item}</h3>
                  <p className="text-2xl font-bold mt-2">75%</p>
                  <Progress value={80} className="mt-4" />
                </CardContent>
              </Card>
            </motion.div>
          ),
        )}
      </div>

      {/* Children Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold mb-4 text-white">Children</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {children.map((child, index) => (
            <ChildCard child={child} index={index} key={child.id} />
          ))}
        </div>
      </motion.div>

      {/* Challenge Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="rounded-2xl shadow-lg bg-gradient-to-r from-green-400 to-blue-500 text-white">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold">🔥 Active Challenge</h2>
            <p>No Sugary Drinks Week 🚫🥤</p>

            <div className="mt-4">
              <p className="text-sm">Progress</p>
              <motion.div className="h-2 bg-white/30 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-white"
                  initial={{ width: 0 }}
                  animate={{ width: "60%" }}
                  transition={{ duration: 1 }}
                />
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
