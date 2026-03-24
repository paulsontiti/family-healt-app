"use client";
import { Child } from "@repo/types";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { toast } from "sonner";
import ChildCard from "../components/ChildCard";
import { AddChildModal } from "../components/AddChildModal";

function page() {
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchChildren = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/children`);
      setChildren(res.data);
    } catch (err: any) {
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChildren();
  }, []);

  if (loading) return <p className="text-white">loading your children....</p>;
  if (children.length === 0 && !loading) return <div className="text-white gap-2 flex">
    <p>No child added</p>
    <AddChildModal/>
  </div>;


  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 }}
      className="mb-8"
    >
      <h2 className="text-2xl font-bold  text-white mb-4">Children</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {children.map((child, index) => (
          <ChildCard child={child} index={index} key={child.id}/>
        ))}
      </div>
    </motion.div>
  );
}

export default page;
