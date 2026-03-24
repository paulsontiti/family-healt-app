"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { childSchema } from "@/lib/validators/child";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import api from "@/lib/api";
import { useAuthStore } from "../../../../store/useStore";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";

type ChildFormData = z.infer<typeof childSchema>;

export function AddChildModal() {
  const [open, setOpen] = useState(false);
  const familyId = useAuthStore((state) => state.parent?.familyId) as string;

  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ChildFormData>({
    resolver: zodResolver(childSchema),
  });

  const onSubmit = async (data: ChildFormData) => {
    try {
      const res = await api.post("/children/child", { ...data, familyId });
      toast.success(res.data.message);
      reset();
      setOpen(false);
      router.push("/dashboard/children");
    } catch (err: any) {
      console.error(err.response.data.message);
      toast.error(err.response.data.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-2xl bg-blue-600 hover:bg-blue-700">
          + Add Child
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add a Child</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <Label>Name</Label>
            <Input placeholder="Enter child's name" {...register("name")} />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Age */}
          <div>
            <Label>Age</Label>
            <Input
              type="number"
              {...register("age", { valueAsNumber: true })}
            />
            {errors.age && (
              <p className="text-red-500 text-sm">{errors.age.message}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <Label>Gender</Label>
            <Select
              onValueChange={(value) => {
                setValue("gender", value as "Male" | "Female");
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender.message}</p>
            )}
          </div>

          {/* Weight */}
          <div>
            <Label>Weight (kg)</Label>
            <Input
              type="number"
              {...register("weight", { valueAsNumber: true })}
            />
            {errors.weight && (
              <p className="text-red-500 text-sm">{errors.weight.message}</p>
            )}
          </div>

          {/* Height */}
          <div>
            <Label>Height (cm)</Label>
            <Input
              type="number"
              {...register("height", { valueAsNumber: true })}
            />
            {errors.height && (
              <p className="text-red-500 text-sm">{errors.height.message}</p>
            )}
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Child"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
