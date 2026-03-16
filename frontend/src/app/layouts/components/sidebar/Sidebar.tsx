import { useState, useEffect } from "react";
import { LogOut, Menu } from "lucide-react";
import SidebarItem from "./components/SidebarItem";
import SidebarCollapseItem from "./components/SidebarCollapseItem";
import { sidebarMenu } from "./sidebarMenu";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui";


export const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const stores = [
    { id: "store-1", name: "Main Store" },
    { id: "store-2", name: "Bandung Store" },
    { id: "store-3", name: "Jakarta Store" },
  ];

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
    };
  }, [mobileOpen]);

  return (
    <>
      <button
        className="lg:hidden flex items-center justify-between p-3 border-b border-slate-200 bg-white absolute m-4 rounded-sm"
        onClick={() => setMobileOpen(true)}
      >
        <Menu size={22} />
      </button>

      {
        mobileOpen && (
          <div
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/30 z-40 lg:hidden h-screen backdrop-blur-xs"
          />
        )
      }

      <aside
        className={`fixed lg:static top-0 left-0 z-50 w-72 h-screen bg-white border-r border-slate-200 flex flex-col transform transition-transform ease-in-out duration-300 select-none
        ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        
        <div className="p-4 border-b border-slate-200 flex items-center gap-3">
          <img src="/sindoms.svg" alt="logo" className="w-9 h-9 rounded-sm"/>
          <div className="flex flex-col">
            <h1 className="text-h4 font-bold tracking-wide text-slate-800 ">
              Sindo MS
            </h1>
            <p className="text-caption">Management System</p>
          </div>
        </div>

        <div className="p-4 border-b border-slate-200">
          <p className="text-caption text-slate-500 mb-2">
            Switch Store
          </p>

          <Select defaultValue="Main Store" >
            <SelectTrigger className="w-full rounded-sm px-3 py-5 border border-slate-300 cursor-pointer mb-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent
              position={"popper"}
            >
              <SelectGroup>
                {
                  stores.map((s) => (
                    <SelectItem key={s.id} value={s.name} className="rounded-sm px-3 py-2 cursor-pointer">
                      {s.name}
                    </SelectItem>
                  ))
                }
              </SelectGroup>
            </SelectContent>
          </Select>

        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="text-caption text-slate-500 mb-2">
            Menus
          </p>

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
                    {menu.children.map((child) => (
                      <SidebarItem
                        key={child.label}
                        label={child.label}
                        path={child.path}
                      />
                    ))}
                  </SidebarCollapseItem>
                );
              }

              return null;
            })
          }
        </nav>

        <div className="border-t border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 ">
              <img
                src="https://i.pravatar.cc/100?img=12"
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover"
              />

              <div className="flex flex-col">
                <span className="text-small font-medium text-slate-800">
                  Kelvin Giovanno
                </span>
                <span className="text-caption text-slate-500">@kelvingiovanno</span>
              </div>
            </div>
            <button className="hover:bg-slate-100 hover:text-slate-800 p-2 rounded-xs cursor-pointer duration-100 transition-colors ease-in-out text-slate-600">
              <LogOut size={18}/>
            </button>
          </div>
        </div>

      </aside>
    </>
  );
};