import Image from "next/image";
import Link from "next/link";
import {
  MdOutlineSettings,
  MdSupervisorAccount,
  MdOutlineAccountCircle,
  MdLogout,
} from "react-icons/md";
import MenuItem from "./menuItems";

const navMenu = [
  { icon: MdSupervisorAccount, path: "/admin/account" },
  { icon: MdOutlineAccountCircle, path: "/admin/users" },
  { icon: MdOutlineSettings, path: "/admin/settings" },
];

export default function SideBar() {
  return (
    <div className="w-0 h-0 hidden  bg-slate-100 sm:bg-white sm:w-full sm:h-screen text-gray-500 sm:flex flex-col justify-between items-center">
      <div className="p-5 flex flex-col items-center">
        <Image
          src="/logo.png"
          alt="logo of the company"
          height={60}
          width={100}
        />
        <MenuItem data={navMenu} />
      </div>
      <div className="p-5">
        <Link className="flex flex-row items-center" href="/signin">
          <MdLogout size={35} />
        </Link>
      </div>
    </div>
  );
}
