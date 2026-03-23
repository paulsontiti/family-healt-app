"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";

export default function GrowthChart({ data }: { data: any[] }) {
  const [type, setType] = useState<"weight" | "height">("weight");

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold">Growth Chart</h3>

        <div className="space-x-2">
          <Button
            variant={type === "weight" ? "default" : "outline"}
            onClick={() => setType("weight")}
          >
            Weight
          </Button>
          <Button
            variant={type === "height" ? "default" : "outline"}
            onClick={() => setType("height")}
          >
            Height
          </Button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />

          <Line
            type="monotone"
            dataKey={type}
            stroke={type === "weight" ? "#3b82f6" : "#10b981"}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}