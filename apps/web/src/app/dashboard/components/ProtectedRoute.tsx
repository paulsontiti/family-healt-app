"use client";

import { redirect } from "next/navigation";
import { useAuthStore } from "../../../../store/useStore";


function ProtectedRoute() {
  const token = useAuthStore((state) => state.token);

  if (token === " ") return redirect("/login");

  return null;
}

export default ProtectedRoute;
