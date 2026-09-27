"use client";
import type { ReactNode } from "react";
import { demoUser } from "@/features/dashboard/demo-data";
import { DashboardSidebar } from "./dashboard-sidebar";
export function DashboardShell({ children }: { children: ReactNode }) { return <main className="dashboard-reference-page"><div className="dashboard-reference-canvas"><DashboardSidebar role={demoUser.role} /><section className="dashboard-reference-content">{children}</section></div></main>; }
