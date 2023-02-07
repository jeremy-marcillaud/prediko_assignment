import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import {
  MdOutlineSettings,
  MdSupervisorAccount,
  MdOutlineAccountCircle,
  MdLogout,
} from "react-icons/md";
import MenuItem from "./menuItems";

type Props = {
  hidden?: boolean;
};

const navMenu = [
  { icon: MdSupervisorAccount, path: "/admin/account" },
  { icon: MdOutlineAccountCircle, path: "/admin/users" },
  { icon: MdOutlineSettings, path: "/admin/settings" },
];

export default function SideBar(props: Props) {
  let { hidden } = props;
  hidden === undefined ? (hidden = true) : false;
  return (
    <div
      className={classNames(
        "sm:bg-white sm:w-full sm:h-screen text-gray-500 sm:flex h-screen flex flex-col justify-between items-center",
        hidden === true && "hidden h-0 w-0",
        hidden === undefined && "hidden h-0 w-0"
      )}
    >
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
