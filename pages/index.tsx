import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { MdAddBox, MdArrowForward } from "react-icons/md";

const inter = Inter({ subsets: ["latin"] });

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
        <div className=" bg-yellow-600 rounded-full h-5 w-5 flex items-center justify-center hover:bg-yellow-500">
          <div>
            <MdArrowForward className="text-white" />
          </div>
        </div>
      </Link>
    </div>
  );
}

Home.authPage = true;
