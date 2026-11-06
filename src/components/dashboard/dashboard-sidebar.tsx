"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  CreditCard,
  FilePlus2,
  FileText,
  Grid2X2,
  LogOut,
  ShieldCheck,
  Upload,
  UsersRound,
} from "lucide-react";
import type { UserRole } from "@/types/api";
import { useLogout } from "@/hooks/use-logout";

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
    href: "/dashboard/upload",
    label: "New contract",
    icon: FilePlus2,
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

function isActivePath(pathname: string, href: string, label: string) {
  if (label === "New contract") {
    return false;
  }
  return (
    pathname === href ||
    (href !== "/dashboard" && pathname.startsWith(`${href}/`))
  );
}

export function DashboardSidebar({ role }: { role?: UserRole }) {
  const pathname = usePathname();
  const logout = useLogout();

  const visibleItems = items.filter(
    (item) => !item.roles || (role && item.roles.includes(role)),
  );

  return (
    <aside className="dashboard-rail">
      <div className="dashboard-rail__brand" aria-label="DocuShield">
        <span className="dashboard-rail__mark">
          <ShieldCheck size={18} />
        </span>
        <strong>DocuShield</strong>
      </div>

      <nav className="dashboard-rail__nav" aria-label="Dashboard">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          const active = isActivePath(pathname, item.href, item.label);
          return (
            <Link
              className={`dashboard-rail__link${active ? " is-active" : ""}`}
              href={item.href}
              key={item.label}
              aria-current={active ? "page" : undefined}
              prefetch
            >
              <Icon size={18} strokeWidth={1.8} />
              <span className="dashboard-rail__label">{item.label}</span>
            </Link>
          );
        })}

        <button
          type="button"
          className="dashboard-rail__link dashboard-rail__link--action"
          onClick={() => logout.mutate()}
          disabled={logout.isPending}
        >
          <LogOut size={18} strokeWidth={1.8} />
          <span className="dashboard-rail__label">
            {logout.isPending ? "Signing out…" : "Sign out"}
          </span>
        </button>
      </nav>
    </aside>
  );
}
