import Link from "next/link";
import { MdArrowForward } from "react-icons/md";
import CircleButton from "../atoms/circleButton";

export default function Home() {
  return (
    <div className="bg-slate-100 h-screen w-screen flex items-center justify-center">
      <Link
        href={`/admin/users`}
        className="mb-5 w-96 h-20 bg-white border rounded-lg shadow-lg shadow-zinc-300 flex justify-around items-center"
      >
        <div>
          <p>Dashboard</p>
        </div>
        <CircleButton path="/admin/users">
          <MdArrowForward className="text-white" />
        </CircleButton>
      </Link>
    </div>
  );
}

Home.authPage = true;
