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
      className={`flex w-full items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors
      ${
        active
          ? "bg-zinc-800 text-white"
          : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
      }`}
    >
      {Icon && <Icon size={18} />}
      {label}
    </button>
  );
};

export default SidebarItem;