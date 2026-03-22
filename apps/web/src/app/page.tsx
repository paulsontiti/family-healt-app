"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const goLogin = () => router.push("/login");
  const goSignup = () => router.push("/register");

  useEffect(() => { 
    const t = localStorage.getItem("token");
    setToken(t);
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-purple-950 to-pink-50 flex flex-col">
      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center p-6 w-full mx-auto"
      >
        <h1 className="text-2xl font-bold">Family Health Tracker</h1>
        {token ? (
          <div>
            {" "}
            <h1 className="text-2xl font-bold">Welcome Back 👋</h1>
            <Button
              className="bg-red-500 hover:bg-red-600"
              onClick={() => {
                localStorage.removeItem("token");
                router.refresh();
              }}
            >
              Logout
            </Button>
          </div>
        ) : (
          <div className="space-x-4">
            <Button onClick={goLogin} className="bg-blue-600 hover:bg-blue-700">
              Login
            </Button>
            <Button
              onClick={goSignup}
              className="bg-green-600 hover:bg-green-700"
            >
              Sign Up
            </Button>
          </div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto mt-12 mb-12"
      >
        <h1 className="text-5xl font-extrabold mb-4">
          Empower Your Family's Health
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          Track habits, monitor growth, and participate in fun family
          challenges.
        </p>
        <div className="space-x-4">
          <Button onClick={goSignup} className="bg-blue-600 hover:bg-blue-700">
            Get Started
          </Button>
          <Button onClick={goLogin} className="bg-green-600 hover:bg-green-700">
            Learn More
          </Button>
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl w-full mx-auto">
        {[
          {
            title: "Track Habits",
            description: "Water, activity, screen time, and nutrition.",
          },
          {
            title: "Growth Charts",
            description: "Monitor height, weight, and BMI over time.",
          },
          {
            title: "Family Challenges",
            description: "Weekly fun challenges to keep everyone active.",
          },
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="rounded-2xl shadow-lg hover:shadow-xl transition">
              <CardContent className="p-6 text-center">
                <CardTitle className="text-xl font-bold mb-2">
                  {feature.title}
                </CardTitle>
                <p className="text-gray-300">{feature.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Call to Action Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="my-12 text-center"
      >
        <h2 className="text-3xl font-bold mb-4">
          Start Your Family’s Health Journey Today
        </h2>
        <Button
          onClick={goSignup}
          className="bg-pink-600 hover:bg-pink-700 text-white"
        >
          Sign Up Now
        </Button>
      </motion.div>

      {/* Footer */}
      <footer className="mt-auto py-6 bg-gray-100 text-center text-gray-600">
        &copy; {new Date().getFullYear()} Family Health Tracker. All rights
        reserved.
      </footer>
    </div>
  );
}
