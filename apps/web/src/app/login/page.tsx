"use client"
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";


export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 to-purple-9500">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[380px] rounded-2xl shadow-xl">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back 👋</h2>

            <div className="space-y-4">
              <Input placeholder="Email" type="email" className="rounded-xl" />
              <Input placeholder="Password" type="password" className="rounded-xl" />

              <Button className="w-full rounded-xl bg-blue-600 hover:bg-blue-700">
                Login
              </Button>
            </div>

            <p className="text-sm text-center mt-4 text-gray-500">
              Don’t have an account? <Link href="/register" className="text-blue-600 cursor-pointer">Sign up</Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

// ==============================
// 📝 REGISTER PAGE
// ==============================

