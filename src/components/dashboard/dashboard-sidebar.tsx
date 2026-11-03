"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  CreditCard,
  FileText,
  Grid2X2,
  LogOut,
  ShieldCheck,
  Upload,
  UsersRound,
} from "lucide-react";
import { useLogout } from "@/hooks/use-logout";
import type { UserRole } from "@/types/api";

type NavItem = {
  href: string;
  label: string;
  icon: typeof Grid2X2;
  roles?: UserRole[];
};
const items: NavItem[] = [
  { href: "/dashboard", label: "Overview", icon: Grid2X2 },
  { href: "/dashboard/contracts", label: "Contracts", icon: FileText },
  {
    href: "/dashboard/risk-review",
    label: "Risk review",
    icon: BarChart3,
    roles: ["admin", "legal"],
  },
  {
    href: "/dashboard/upload",
    label: "Upload",
    icon: Upload,
    roles: ["admin", "legal"],
  },
  {
    href: "/dashboard/settings/workspace",
    label: "Workspace",
    icon: UsersRound,
    roles: ["admin"],
  },
  {
    href: "/dashboard/settings/billing",
    label: "Billing",
    icon: CreditCard,
    roles: ["admin"],
  },
];

export function DashboardSidebar({ role }: { role?: UserRole }) {
  const pathname = usePathname();
  const logout = useLogout();

  const visibleItems = items.filter(
    (item) => !item.roles || (role && item.roles.includes(role)),
  );

  // Which route is open right now (fallback to the first item so the
  // pill always has a home). The pill is rendered IN PLACE, between the
  // items above it and the items below it — never pinned to the top.
  const activeIndex = Math.max(
    visibleItems.findIndex(
      (item) =>
        pathname === item.href ||
        (item.href !== "/dashboard" && pathname.startsWith(`${item.href}/`)),
    ),
    0,
  );
  const activeItem = visibleItems[activeIndex];
  const ActiveIcon = activeItem?.icon;
  const above = visibleItems.slice(0, activeIndex);
  const below = visibleItems.slice(activeIndex + 1);

  const renderLink = (item: NavItem) => {
    const Icon = item.icon;
    return (
      <Link className="dashboard-rail__link" href={item.href} key={item.label}>
        <Icon size={20} />
        <span className="dashboard-rail__label">{item.label}</span>
      </Link>
    );
  };

  return (
    <aside className="dashboard-rail">
      {/* Top block: brand + every item ABOVE the active one. Its bottom-right
          corner carries the big inward curve that the pill flows out of. */}
      <div className="dashboard-rail__top">
        <div className="dashboard-rail__brand" aria-label="DocuShield">
          <ShieldCheck size={30} />
          <span>DocuShield</span>
        </div>
        {above.length > 0 && (
          <nav className="dashboard-rail__nav">{above.map(renderLink)}</nav>
        )}
      </div>

      {/* Channel: indigo strip holding the white pill for the active route. */}
      <div className="dashboard-rail__channel">
        {activeItem && ActiveIcon && (
          <Link
            className="dashboard-rail__link is-active"
            href={activeItem.href}
            aria-current="page"
          >
            <ActiveIcon size={20} />
            <span className="dashboard-rail__label">{activeItem.label}</span>
          </Link>
        )}
      </div>

      {/* Body block: every item BELOW the active one + logout. Its top-right
          corner mirrors the curve, closing the wave under the pill. */}
      <div className="dashboard-rail__body">
        {below.length > 0 && (
          <nav className="dashboard-rail__nav">{below.map(renderLink)}</nav>
        )}
        <div className="dashboard-rail__footer">
          <button
            className="dashboard-rail__link"
            type="button"
            aria-label="Log out"
            onClick={() => logout.mutate()}
          >
            <LogOut size={20} />
            <span className="dashboard-rail__label">Log out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
