import type { ComponentProps } from "react";

type InputProps = ComponentProps<"input">;

export const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
        className={`block border border-slate-300 h-12 px-4 py-2 w-full rounded-sm placeholder:text-sm
            outline-none transition-all duration-200
            focus:border-slate-500 focus:ring-2 focus:ring-slate-500/30
            ${className ?? ""}`}
        {...props}
    />
  );
};