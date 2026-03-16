import type React from "react";
import { useLocation, useNavigate } from "react-router";

type SidebarItemProps = {
  icon?: React.ElementType;
  label: string;
  path: string;
};

const SidebarItem = ({ icon: Icon, label, path }: SidebarItemProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const active = location.pathname === path;

  return (
    <button
      onClick={() => navigate(path)}
      className={`cursor-pointer flex w-full items-center gap-3 px-4 py-3 rounded-sm text-small transition-colors
      ${
        active
          ? "bg-slate-200 text-slate-900 font-medium"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      }`}
    >
      {Icon && <Icon size={18} />}
      {label}
    </button>
  );
};
export default SidebarItem;