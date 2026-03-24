import { Parent } from "@repo/types";
import { useEffect, useState } from "react";

export default function useParent() {
  const [parent, setParent] = useState<Parent | null>(null);

  useEffect(() => {
    const parentJson = JSON.parse(localStorage.getItem("parent") || "");
    setParent(parentJson);
  }, []);
  return parent;
}
