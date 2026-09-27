"use client";
import { demoContracts, demoStats, demoUser } from "@/features/dashboard/demo-data";
import { DashboardInsights } from "./dashboard-insights";
import { DashboardReviewCards } from "./dashboard-review-cards";
import { DashboardStatGrid } from "./dashboard-stat-grid";
import { DashboardTopbar } from "./dashboard-topbar";
export function DashboardOverview() { return <section className="dashboard-overview"><DashboardTopbar user={demoUser} /><DashboardStatGrid stats={demoStats} isLoading={false} /><DashboardInsights stats={demoStats} user={demoUser} isLoading={false} /><DashboardReviewCards contracts={demoContracts} isLoading={false} role={demoUser.role} /></section>; }
