import { ReactNode } from "react";
import { Props } from "./atoms/button";

export default function TopBar({ children }: Props) {
  return (
    <div className="w-full bg-white h-1/6 p-10 rounded-lg flex justify-between items-center">
      {children}
    </div>
  );
}
