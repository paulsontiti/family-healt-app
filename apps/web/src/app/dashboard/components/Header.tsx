"use client";
import { motion } from "framer-motion";
import Greetings from "@/components/Greetings";

import SidebarMobile from "./SidebarMobil";

export default function Header() {
  return (
    <div className=" shadow p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 justify-between items-center mb-8"
      >
        <div className="flex flex-col flex-6">
          <h1 className="text-3xl font-bold text-white">👨‍👩‍👧 Family Dashboard</h1>
          <p className="text-gray-400">
            Track your children's health in real-time
          </p>
        </div>
        <div className="justify-between items-center">
          <Greetings />
        </div>
        <SidebarMobile />
      </motion.div>
    </div>
  );
}
