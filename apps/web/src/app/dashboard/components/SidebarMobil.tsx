import Link from "next/link";

export default function SidebarMobile() {
  return (
    <div className=" shadow-md p-4 text-white md:hidden">
      <ul className="flex gap-4">
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/dashboard/children">Children</Link>
        </li>

        <li>
          <Link href="/dashboard/challenges">Challenges</Link>
        </li>
        <li>
          <Link href="/dashboard/tips">Tips</Link>
        </li>
      </ul>
    </div>
  );
}
