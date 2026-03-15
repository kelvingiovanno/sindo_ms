import { ChevronRight } from "lucide-react";
import { useState } from "react";
import type React from "react";

type SidebarCollapseItemProps = {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
};

const SidebarCollapseItem = ({
  icon: Icon,
  label,
  children,
}: SidebarCollapseItemProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-1">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-3 py-2 rounded-md text-sm text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
      >
        <div className="flex items-center gap-3">
          <Icon size={18} />
          {label}
        </div>

        <ChevronRight
          size={16}
          className={`transition-transform duration-200 ${
            open ? "rotate-90" : ""
          }`}
        />
      </button>

      {open && (
        <div className="ml-5 flex flex-col gap-1 border-l border-zinc-800 pl-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default SidebarCollapseItem;