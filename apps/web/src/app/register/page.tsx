"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-950 to-blue-950">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[380px] rounded-2xl shadow-xl">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Create Account 🚀</h2>

            <div className="space-y-4">
              <Input placeholder="Full Name" className="rounded-xl" />
              <Input placeholder="Email" type="email" className="rounded-xl" />
              <Input placeholder="Password" type="password" className="rounded-xl" />

              <Button className="w-full rounded-xl bg-green-600 hover:bg-green-700">
                Sign Up
              </Button>
            </div>

            <p className="text-sm text-center mt-4 text-gray-500">
              Already have an account? <Link href="/login" className="text-green-600 cursor-pointer">Login</Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}