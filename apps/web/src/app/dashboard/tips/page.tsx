"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function TipsPage() {
  const [tips, setTips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/tips")
      .then(res => res.json())
      .then(data => setTips(data))
      .catch(() => setError("Failed to load tips"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">Loading tips...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tips.map((tip) => (
        <Card key={tip.id} className="hover:shadow-lg transition rounded-2xl">
          <CardContent>
            <h3 className="font-bold mb-2">{tip.title}</h3>
            <p className="text-gray-600">{tip.content}</p>
            <Badge className="mt-2">{tip.category}</Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}