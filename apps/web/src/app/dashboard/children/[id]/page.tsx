"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import GrowthChart from "../../components/charts/GrowthChart";
import { socket } from "../../../../../utils/socket";

export default function ChildProfile() {
  const { id } = useParams();
  const [child, setChild] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:5000/api/children/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setChild(data));

    fetch(`http://localhost:5000/api/children/${id}/growth`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setLogs(data));
  }, [id]);



useEffect(() => {
  socket.emit("join_family", child.familyId);

  socket.on("growth_updated", (newLog) => {
    if (newLog.childId === id) {
      setLogs((prev) => [...prev, newLog]);
    }
  });

  return () => {
    socket.off("growth_updated");
  };
}, [child]);

  if (!child) return <div>Loading...</div>;

  const bmi = Number(calculateBMI(child.weight, child.height));
  const category = getBMICategory(bmi);

  return (
    <div className="space-y-6">
      {/* Child Info */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold">{child.name}</h2>
          <p>Age: {child.age}</p>
          <p>Weight: {child.weight}kg</p>
          <p>Height: {child.height}cm</p>
        </CardContent>
      </Card>

      {/* BMI */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-bold mb-2">BMI</h3>
          <p className="text-xl font-bold">{bmi}</p>
          <p className={`font-semibold ${category.color}`}>{category.label}</p>
        </CardContent>
      </Card>

      {/* Chart */}
      <GrowthChart data={logs} />
    </div>
  );
}

// BMI Function
function calculateBMI(weight: number, height: number) {
  const h = height / 100;
  return (weight / (h * h)).toFixed(2);
}

function getBMICategory(bmi: number) {
  if (bmi < 18.5) return { label: "Underweight", color: "text-blue-500" };
  if (bmi < 25) return { label: "Normal", color: "text-green-500" };
  return { label: "Overweight", color: "text-red-500" };
}
