"use client"
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 shadow p-4">
        <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold">👨‍👩‍👧 Family Dashboard</h1>
          <p className="text-gray-400">
            Track your children's health in real-time
          </p>
        </div>
        <Button className="rounded-2xl bg-blue-600 hover:bg-blue-700">
          + Add Child
        </Button>
      </motion.div>
      

    </div>
  );
}