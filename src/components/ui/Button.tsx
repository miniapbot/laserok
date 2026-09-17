import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
}

const styles = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  secondary: "bg-slate-200 hover:bg-slate-300 text-slate-900",
  ghost: "bg-transparent hover:bg-slate-100 text-slate-700",
};

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`px-4 py-2 rounded-xl font-medium transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed ${styles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
