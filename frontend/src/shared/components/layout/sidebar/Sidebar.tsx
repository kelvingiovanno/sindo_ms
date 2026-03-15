import SidebarItem from "./components/SidebarItem";
import SidebarCollapseItem from "./components/SidebarCollapseItem";
import { sidebarMenu } from "./sidebarMenu";

export const Sidebar = () => {
  return (
    <aside className="w-72 h-screen bg-zinc-900 text-zinc-200 border-r border-zinc-800 flex flex-col">

      {/* Logo */}
      <div className="px-6 py-5 border-b border-zinc-800">
        <h1 className="text-lg font-semibold tracking-wide">
          Sindo MS
        </h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {sidebarMenu.map((menu) => {

          if (menu.type === "item") {
            return (
              <SidebarItem
                key={menu.label}
                icon={menu.icon}
                label={menu.label}
                path={menu.path!}
              />
            );
          }

          if (menu.type === "collapse") {
            return (
              <SidebarCollapseItem
                key={menu.label}
                icon={menu.icon}
                label={menu.label}
              >
                {menu.children!.map((child) => (
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
        })}
      </nav>

      {/* Profile */}
      <div className="border-t border-zinc-800 p-4">
        <div className="flex items-center gap-3 p-2 rounded-md hover:bg-zinc-800 transition-colors cursor-pointer">

          <img
            src="https://i.pravatar.cc/100?img=12"
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover"
          />

          <div className="flex flex-col">
            <span className="text-sm font-medium text-white">
              John Doe
            </span>
            <span className="text-xs text-zinc-400">
              @johndoe
            </span>
          </div>

        </div>
      </div>

    </aside>
  );
};