import type { ComponentProps } from "react";

type FieldLabelProps = ComponentProps<"label">;

export const FieldLabel = ({ className, children, ...props }: FieldLabelProps) => {
  return (
    <label
      className={`block text-sm font-medium text-black/80 ${className ?? ""}`}
      {...props}
    >
      {children}
    </label>
  );
};

type FieldButtonProps = ComponentProps<"button">;

export const FieldButton = ({ className, children, ...props }: FieldButtonProps) => {
  return (
    <button
        className={`flex gap-4 justify-center items-center w-full cursor-pointer bg-black text-white font-medium h-12 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed ${className ?? ""}`}
        {...props}
    >
        {children}
    </button>
  );
};

export const Field = ({ children }: { children: React.ReactNode }) => {
  return <div className="space-y-2">{children}</div>
}
