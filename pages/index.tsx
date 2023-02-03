import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { MdAddBox, MdArrowForward } from "react-icons/md";
import CircleButton from "../components/atoms/circleButton";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="bg-slate-100 h-screen w-screen flex items-center justify-center">
      <div className="mb-5 w-96 h-20 bg-white border rounded-lg shadow-lg shadow-zinc-300 flex justify-around items-center">
        <div>
          <p>Dashboard</p>
        </div>
        <CircleButton path="/admin/users">
          <MdArrowForward className="text-white" />
        </CircleButton>
      </div>
    </div>
  );
}

Home.authPage = true;
