"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, CreditCard, FileText, Grid2X2, LogOut, Settings, Upload, UsersRound } from "lucide-react";
import type { UserRole } from "@/types/api";

type NavItem = { href: string; label: string; icon: typeof Grid2X2; roles?: UserRole[] };
const items: NavItem[] = [{ href: "/dashboard", label: "Overview", icon: Grid2X2 }, { href: "/dashboard/contracts", label: "Contracts", icon: FileText }, { href: "/dashboard/risk-review", label: "Risk review", icon: BarChart3, roles: ["admin", "legal"] }, { href: "/dashboard/contracts", label: "Upload", icon: Upload, roles: ["admin", "legal"] }, { href: "/dashboard/settings/workspace", label: "Workspace", icon: UsersRound, roles: ["admin"] }, { href: "/dashboard/settings/billing", label: "Billing", icon: CreditCard, roles: ["admin"] }];

export function DashboardSidebar({ role }: { role?: UserRole }) { const pathname = usePathname(); return <aside className="dashboard-rail"><nav className="dashboard-rail__nav">{items.filter((item) => !item.roles || (role && item.roles.includes(role))).map((item) => { const Icon = item.icon; const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(`${item.href}/`)); return <Link className={`dashboard-rail__link ${active ? "is-active" : ""}`} href={item.href} aria-label={item.label} key={item.label}><Icon size={20} /><span>{item.label}</span></Link>; })}</nav><div className="dashboard-rail__footer">{role === "admin" && <Link className="dashboard-rail__link" href="/dashboard/settings/workspace" aria-label="Settings"><Settings size={20} /><span>Settings</span></Link>}<button className="dashboard-rail__link" aria-label="Log out"><LogOut size={20} /><span>Log out</span></button><div className="dashboard-rail__avatar">DS</div></div></aside>; }
