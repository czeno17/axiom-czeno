import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-indigo-600 hover:bg-indigo-700 text-white",
  secondary: "bg-slate-900 hover:bg-black text-white",
  ghost: "border border-slate-300 text-slate-600 hover:bg-slate-50",
  danger: "border border-rose-300 text-rose-700 hover:bg-rose-50",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  icon?: ReactNode;
}

export function Button({ variant = "primary", icon, className = "", children, ...rest }: ButtonProps) {
  return (
    <button
      className={`rounded px-4 py-2 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${VARIANT_CLASSES[variant]} ${className}`}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
}
