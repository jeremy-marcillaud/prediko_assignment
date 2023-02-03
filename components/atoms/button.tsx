import { type ButtonHTMLAttributes, type ReactNode } from "react";
import classNames from "classnames";

type buttonVariant = "regular" | "danger";
type buttonSize = "regular" | "large" | "small";

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: buttonSize;
  variant?: buttonVariant;
  disabled?: boolean;
  children: ReactNode;
}

export default function Button(props: Props) {
  const {
    size = "regular",
    variant = "regular",
    children,
    disabled,
    ...rest
  } = props;
  return (
    <button
      className={classNames(
        "h-fit w-fit rounded-lg text-xs font-medium transition-all",
        size === "regular" && "w-32 mr-2 p-3 py-2 text-sm",
        size === "small" && "px-2 py-2",
        variant === "regular" && "bg-emerald-300 text-white",
        variant === "danger" && "bg-red-300 text-white",
        disabled === false && "bg-emerald-500"
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
