import { ChevronRight } from "lucide-react";
import type React from "react";

type SidebarCollapseItemProps = {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
};

const SidebarCollapseItem = ({
  icon: Icon,
  label,
  children,
  isOpen,
  onToggle,
}: SidebarCollapseItemProps) => {
  
  return (
    <div className="space-y-1">
      <button
        onClick={onToggle}
        className="cursor-pointer flex w-full items-center justify-between p-3 rounded-sm text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Icon size={18} />
          {label}
        </div>

        <ChevronRight
          size={16}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-90" : ""
          }`}
        />
      </button>

      {
        isOpen && (
          <div className="ml-5 flex flex-col gap-1 border-l border-slate-200 pl-5">
            {children}
          </div>
        )
      }
    </div>
  );
};

export default SidebarCollapseItem;