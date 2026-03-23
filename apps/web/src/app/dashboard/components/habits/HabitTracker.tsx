"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

type Props = {
  label: string;
  icon: string;
  value: number;
  onClick: () => void;
};

export default function HabitCard({ label, icon, value, onClick }: Props) {
  return (
    <motion.div whileTap={{ scale: 0.95 }}>
      <Card
        onClick={onClick}
        className="cursor-pointer rounded-2xl shadow hover:shadow-lg transition"
      >
        <CardContent className="p-6 text-center">
          <div className="text-3xl mb-2">{icon}</div>
          <h3 className="font-semibold">{label}</h3>
          <p className="text-2xl font-bold mt-2">{value}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}