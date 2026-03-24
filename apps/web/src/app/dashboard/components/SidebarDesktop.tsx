import Link from "next/link";

export default function SidebarDesktop() {
  return (
    <div className="w-64 shadow-md p-4 text-white h-full flex-1 hidden md:flex">
     

      <ul className="space-y-4 h-screen">
        <li><Link href="/dashboard">Dashboard</Link></li>
        <li><Link href="/dashboard/children">Children</Link></li>
     
        <li><Link href="/dashboard/challenges">Challenges</Link></li>
        <li><Link href="/dashboard/tips">Tips</Link></li>
      </ul>
    </div>
  );
}