"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthWrapper } from "../login/page";
import authApi from "@/lib/authApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../../store/useStore";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name is too short"),
    email: z.email("Enter a valid email"),
    password: z.string().min(6, "Minimum 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {setParent,setToken} = useAuthStore();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = await authApi.post("/register", data);
      setParent(res.data.token);
      setToken(res.data.token);

      toast.success("Login was successful");
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthWrapper>
      <h2 className="text-2xl font-bold text-center mb-2">Create Account 🚀</h2>
      <p className="text-sm text-muted-foreground text-center mb-6">
        Start your journey with us
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label>Full Name</Label>
          <Input {...register("name")} />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">
              {errors.name.message as string}
            </p>
          )}
        </div>

        <div>
          <Label>Email</Label>
          <Input {...register("email")} />
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

        <div>
          <Label>Confirm Password</Label>
          <Input type="password" {...register("confirmPassword")} />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500 mt-1">
              {errors.confirmPassword.message as string}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full rounded-xl bg-purple-600 hover:bg-purple-700"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Sign Up"}
        </Button>
      </form>

      <p className="text-sm text-center mt-6 text-gray-500">
        Already have an account?{" "}
        <Link href="/login" className="text-purple-600 hover:underline">
          Login
        </Link>
      </p>
    </AuthWrapper>
  );
}
