import { type ButtonHTMLAttributes, type ReactNode } from "react";
import classNames from "classnames";
import Link from "next/link";

type buttonVariant = "regular" | "danger" | "ghost" | "link";
type buttonSize = "regular" | "large" | "small";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  path: string;
  size?: buttonSize;
  variant?: buttonVariant;
  children: ReactNode;
}

export default function CircleButton({
  size = "regular",
  variant = "regular",
  path,
  children,
}: Props) {
  return (
    <Link
      className={classNames(
        "h-fit w-fit rounded-full m-2 text-xs font-medium transition-all",
        size === "large" && "px-5 py-3 text-base",
        size === "regular" && "w-10 p-2 py-2 text-sm",
        size === "small" && "p-2",
        variant === "regular" && "bg-yellow-600  text-white"
      )}
      href={path}
    >
      {children}
    </Link>
  );
}
