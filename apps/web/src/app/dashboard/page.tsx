"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const children = [
  { id: 1, name: "Alice", age: 7, weight: 25, height: 120 },
  { id: 2, name: "Bob", age: 5, weight: 20, height: 110 },
];

export default function Dashboard() {
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
        <h2 className="text-2xl font-bold mb-4">Children</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {children.map((child, index) => (
            <motion.div
              key={child.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="rounded-2xl shadow-lg hover:shadow-xl transition">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">{child.name}</h3>
                    <span className="text-sm text-gray-300">
                      Age {child.age}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-blue-50 p-3 rounded-xl text-black">
                      Weight
                      <p className="font-bold">{child.weight}kg</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-xl text-black">
                      Height
                      <p className="font-bold">{child.height}cm</p>
                    </div>
                  </div>

                  <Button className="mt-4 w-full rounded-xl">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
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
