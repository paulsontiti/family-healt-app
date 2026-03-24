"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { toast } from "sonner";

type Props = {
  data: {
    date: string;
    water: number;
    fruits: number;
    activity: number;
    screen: number;
  }[];
};

export default function HabitChart({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);

  const fetchHabitLogs = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/children/weekly/${id}`);

      setLogs(res.data);
    } catch (err: any) {
      console.log(err);
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabitLogs();
  }, [id]);
  return (
    <Card className="rounded-2xl shadow-lg">
      <CardContent className="p-6">
        <h3 className="text-lg font-bold mb-4">Weekly Habit Trends</h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={logs}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line type="monotone" dataKey="water" stroke="#3b82f6" />
            <Line type="monotone" dataKey="fruits" stroke="#10b981" />
            <Line type="monotone" dataKey="activity" stroke="#f59e0b" />
            <Line type="monotone" dataKey="screen" stroke="#ef4444" />
            <Line type="monotone" dataKey="veggies" stroke="#000" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
