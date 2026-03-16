import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import SidebarItem from "./components/SidebarItem";
import SidebarCollapseItem from "./components/SidebarCollapseItem";
import { sidebarMenu } from "./sidebarMenu";

export const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);


  const toggleMenu = (label: string) => {
    setOpenMenu((prev) => (prev === label ? null : label));
  };
  
  useEffect(() => {
    if (mobileOpen) {
      document.documentElement.style.overflow = "hidden";
      return;
    }

    document.documentElement.style.overflow = "";

    return () => {
      document.documentElement.style.overflow = "";
    }
  }, [mobileOpen]);

  return (
    <>
    
      <button 
        className="lg:hidden flex items-center justify-between p-3 border-b border-slate-200 bg-white absolute m-4 rounded-sm"
        onClick={() => setMobileOpen(true)}>
        <Menu size={22} />
      </button>
    

      {
        mobileOpen && (
          <div
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/30 z-40 lg:hidden h-screen"
          />
        )
      }

      <aside
        className={`fixed lg:static top-0 left-0 z-50 w-72 h-screen bg-white border-r border-slate-200 flex flex-col transform transition-transform duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >

        <div className="px-6 py-6 border-b border-slate-200">
          <h1 className="text-h4 font-bold tracking-wide text-slate-800">
            Sindo MS
          </h1>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {
            sidebarMenu.map((menu) => {
                if (menu.type === "ITEM") {
                  return (
                    <SidebarItem
                      key={menu.label}
                      icon={menu.icon}
                      label={menu.label}
                      path={menu.path}
                    />
                  );
                }

              if (menu.type === "COLLAPSE") {
                return (
                  <SidebarCollapseItem
                    key={menu.label}
                    icon={menu.icon}
                    label={menu.label}
                    isOpen={openMenu === menu.label}
                    onToggle={() => toggleMenu(menu.label)}
                  >
                    {
                      menu.children.map((child) => (
                        <SidebarItem
                          key={child.label}
                          label={child.label}
                          path={child.path}
                        />
                      ))
                    }
                  </SidebarCollapseItem>
                );
              }

              return null;
            })
          }
        </nav>

        <div className="border-t border-slate-200 p-4">
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
            <img
              src="https://i.pravatar.cc/100?img=12"
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover"
            />

            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-800">
                John Doe
              </span>
              <span className="text-xs text-slate-500">@johndoe</span>
            </div>
          </div>
        </div>

      </aside>
    </>
  );
};