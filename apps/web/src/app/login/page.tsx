"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import authApi from "../../lib/authApi";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";
import { useAuthStore } from "../../../store/useStore";

// ==============================
// ✅ Validation Schemas
// ==============================

const loginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// ==============================
// 🎨 Shared UI Wrapper
// ==============================

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-slate-900 to-purple-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="rounded-2xl shadow-2xl border border-white/10 backdrop-blur">
          <CardContent className="p-8">{children}</CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setParent, setToken } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
  
      const res = await authApi.post("/login", data);
      setParent(res.data.parent);
      setToken(res.data.token);

      toast.success("Login was successful");
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("An error occured,try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthWrapper>
      <h2 className="text-2xl font-bold text-center mb-2">Welcome Back 👋</h2>
      <p className="text-sm text-muted-foreground text-center mb-6">
        Login to continue your journey
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label>Email</Label>
          <Input placeholder="you@example.com" {...register("email")} />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">
              {errors.email.message as string}
            </p>
          )}
        </div>

        <div>
          <Label>Password</Label>
          <Input type="password" {...register("password")} />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">
              {errors.password.message as string}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full rounded-xl bg-blue-600 hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Login"}
        </Button>
      </form>

      <p className="text-sm text-center mt-6 text-gray-500">
        Don’t have an account?{" "}
        <Link href="/register" className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </p>
    </AuthWrapper>
  );
}
