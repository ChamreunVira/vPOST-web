"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon, type IconName } from "@/components/ui/icons";
import { BrandSymbol } from "@/components/ui/brand-symbol";
import { initials } from "@/lib/format";

type NavItem = { label: string; href: string; icon: IconName };
const groups: { label: string; items: NavItem[] }[] = [
  {
    label: "ការងារប្រចាំថ្ងៃ",
    items: [
      { label: "ទិដ្ឋភាពទូទៅ", href: "/dashboard", icon: "grid" },
      { label: "ប្រព័ន្ធលក់", href: "/pos", icon: "shopping-bag" },
    ],
  },
  {
    label: "ទំនិញ",
    items: [
      { label: "ការលក់", href: "/sales", icon: "receipt" },
      { label: "ផលិតផល", href: "/products", icon: "box" },
      { label: "ប្រភេទទំនិញ", href: "/categories", icon: "layers" },
      { label: "ស្តុក", href: "/inventory", icon: "archive" },
    ],
  },
  {
    label: "ប្រតិបត្តិការ",
    items: [
      { label: "ការទិញចូល", href: "/purchases", icon: "truck" },
      { label: "អ្នកផ្គត់ផ្គង់", href: "/suppliers", icon: "users" },
      { label: "អតិថិជន", href: "/customers", icon: "users" },
    ],
  },
  {
    label: "របាយការណ៍",
    items: [
      { label: "វិភាគទិន្នន័យ", href: "/reports", icon: "chart" },
      { label: "ក្រុមការងារ", href: "/users", icon: "users" },
    ],
  },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f6f8f8] text-[#0b1b3c]">
      {/* Sidebar */}
      <aside
        className={`sticky top-0 h-screen overflow-y-auto bg-[#081b3f] text-[#b9c1d8] flex flex-col p-4 shrink-0 z-40 transition-all duration-200 ${
          collapsed ? "w-[76px]" : "w-[244px]"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} fixed md:sticky`}
      >
        {/* Brand Header */}
        <div className="h-10 px-2 flex items-center gap-2.5 mb-6 text-white">
          <BrandSymbol size={34} className="shrink-0" />
          {!collapsed && (
            <span className="flex flex-col">
              <strong className="text-base font-bold tracking-tight text-white leading-none">vPost</strong>
              <small className="text-xs text-[#94a3b8] mt-1">ប្រព័ន្ធគ្រប់គ្រងហាង</small>
            </span>
          )}
          <button
            className="md:hidden ml-auto text-[#94a3b8] hover:text-white p-1"
            onClick={() => setMobileOpen(false)}
            aria-label="បិទម៉ឺនុយ"
          >
            <Icon name="x" size={18} />
          </button>
        </div>

        {/* Sidebar Nav */}
        <nav className="flex-1 space-y-5">
          {groups.map((group) => (
            <div key={group.label}>
              {!collapsed && (
                <span className="block px-3 pb-2 text-[11px] font-bold tracking-wider uppercase text-[#64748b]">
                  {group.label}
                </span>
              )}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const active =
                    pathname === item.href ||
                    (item.href !== "/dashboard" && pathname.startsWith(item.href));

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      title={collapsed ? item.label : undefined}
                      onClick={() => setMobileOpen(false)}
                      className={`relative flex items-center gap-3 h-10 px-3 rounded-md text-sm font-medium transition-colors ${
                        active
                          ? "bg-[#07885f]/20 text-white font-semibold"
                          : "text-[#cbd5e1] hover:bg-white/10 hover:text-white"
                      } ${collapsed ? "justify-center px-0" : ""}`}
                    >
                      <Icon name={item.icon} size={18} className="shrink-0" />
                      {!collapsed && <span>{item.label}</span>}
                      {active && !collapsed && (
                        <i className="absolute left-0 top-2 bottom-2 w-1 bg-[#18a878] rounded-r-md" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer Settings & Profile */}
        <div className="pt-3 border-t border-white/10 space-y-2">
          <Link
            href="/settings"
            title={collapsed ? "ការកំណត់" : undefined}
            className={`flex items-center gap-3 h-10 px-3 rounded-md text-sm font-medium text-[#cbd5e1] hover:bg-white/10 hover:text-white transition-colors ${
              collapsed ? "justify-center px-0" : ""
            }`}
          >
            <Icon name="settings" size={18} className="shrink-0" />
            {!collapsed && <span>ការកំណត់</span>}
          </Link>

          <div
            className={`flex items-center gap-2.5 p-2 text-[#f0f2fa] ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <span className="w-8 h-8 rounded-full bg-[#d7f0e7] text-[#056447] text-xs font-bold inline-grid place-items-center shrink-0">
              {initials("Malis Chhay")}
            </span>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <strong className="block text-sm font-semibold truncate">ម៉ាលីស ឆាយ</strong>
                <small className="block text-xs text-[#94a3b8] truncate">គណនីម្ចាស់ហាង</small>
              </div>
            )}
            {!collapsed && <Icon name="more" size={16} className="text-[#64748b] shrink-0" />}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-[#e2e8f0] flex items-center justify-between px-6 sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-3">
            {/* Desktop Collapse Toggle */}
            <button
              onClick={() => setCollapsed((v) => !v)}
              className="p-1.5 rounded-md text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#0f172a] transition-colors cursor-pointer hidden md:inline-flex"
              aria-label="បង្រួម/ពង្រីកម៉ឺនុយ"
              title={collapsed ? "ពង្រីកម៉ឺនុយ" : "បង្រួមម៉ឺនុយ"}
            >
              <Icon name="menu" size={18} />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="p-1.5 rounded-md text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#0f172a] transition-colors cursor-pointer md:hidden"
              aria-label="បើកម៉ឺនុយ"
            >
              <Icon name="menu" size={18} />
            </button>

            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-[#94a3b8]">
              <span>vPost</span>
              <Icon name="chevron-right" size={14} />
              <strong className="text-[#0f172a] font-semibold capitalize">
                {pathname === "/dashboard"
                  ? "ទិដ្ឋភាពទូទៅ"
                  : pathname.split("/")[1]?.replace("-", " ")}
              </strong>
            </div>
          </div>

          {/* Topbar Right Actions */}
          <div className="flex items-center gap-4">
            <Link
              href="/products"
              className="hidden sm:flex items-center gap-2 h-8.5 px-3 bg-[#f8fafc] border border-[#cbd5e1] text-[#64748b] rounded-md text-xs hover:border-[#94a3b8] transition-colors min-w-[180px]"
            >
              <Icon name="search" size={15} />
              <span>ស្វែងរក...</span>
              <kbd className="ml-auto text-[10px] border border-[#cbd5e1] px-1.5 py-0.5 rounded text-[#94a3b8]">
                ⌘ K
              </kbd>
            </Link>

            <Link
              href="/sales"
              className="relative p-2 rounded-md text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#0f172a] transition-colors"
              aria-label="មើលការជូនដំណឹង"
            >
              <Icon name="bell" size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#07885f]" />
            </Link>

            <span className="w-px h-5 bg-[#e2e8f0]" />

            <span className="text-xs font-semibold text-[#334155] flex items-center gap-1">
              ហាងកណ្តាល <Icon name="chevron-down" size={14} className="text-[#94a3b8]" />
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
