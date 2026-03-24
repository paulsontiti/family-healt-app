"use client";
import { Button } from "./ui/button";
import { useAuthStore } from "../../store/useStore";
import { AddChildModal } from "@/app/dashboard/components/AddChildModal";

function Greetings() {
  const {logout,parent} = useAuthStore();
  return (
    <div className="flex items-center justify-end gap-4 flex-6">
      {" "}
      <h1 className="md:text-2xl text-white font-bold flex">
        {`Hi ${parent?.name}`} <span className="">👋</span>
      </h1>
      <AddChildModal />
      <Button
        className="bg-red-500 hover:bg-red-600"
        onClick={() => {
          logout();
          window.location.reload();
        }}
      >
        Logout
      </Button>
    </div>
  );
}

export default Greetings;
