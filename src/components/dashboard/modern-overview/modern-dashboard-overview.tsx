"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  ClipboardCheck,
  FileText,
  Search,
  ShieldAlert,
  Sparkles,
  Upload,
  Users,
} from "lucide-react";
import { useMe } from "@/hooks/use-me";

const KPIS = [
  {
    label: "Active contracts",
    value: "174",
    delta: "+12%",
    up: true,
    hint: "vs last month",
    icon: FileText,
    tone: "mint",
  },
  {
    label: "Ready for review",
    value: "48",
    delta: "+8%",
    up: true,
    hint: "awaiting legal",
    icon: ClipboardCheck,
    tone: "blue",
    featured: true,
  },
  {
    label: "Risk flags",
    value: "289",
    delta: "-4%",
    up: false,
    hint: "open items",
    icon: ShieldAlert,
    tone: "rose",
  },
  {
    label: "Team members",
    value: "21",
    delta: "+2",
    up: true,
    hint: "this workspace",
    icon: Users,
    tone: "navy",
  },
] as const;

const QUEUE = [
  {
    title: "Vendor MSA — Acme Cloud",
    risk: "High",
    tone: "high",
    meta: "Liability · 92% confidence",
  },
  {
    title: "NDA renewal — Northwind",
    risk: "Medium",
    tone: "med",
    meta: "Renewal window · 81%",
  },
  {
    title: "SaaS Order Form — Contoso",
    risk: "Low",
    tone: "low",
    meta: "Indemnity · 76%",
  },
  {
    title: "DPA addendum — Fabrikam",
    risk: "High",
    tone: "high",
    meta: "Data transfer · 88%",
  },
] as const;

const TOOLS = [
  { label: "AI analysis", href: "/dashboard/upload", icon: Sparkles, tone: "rose" },
  { label: "Risk scan", href: "/dashboard/risk-review", icon: ShieldAlert, tone: "mint" },
  { label: "Contracts", href: "/dashboard/contracts", icon: FileText, tone: "amber" },
  { label: "Upload", href: "/dashboard/upload", icon: Upload, tone: "blue" },
] as const;

const BARS = [42, 68, 55, 80, 47, 72, 63];

function useTodayLabel() {
  return useMemo(() => {
    return new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());
  }, []);
}

export function ModernDashboardOverview() {
  const today = useTodayLabel();
  const { data: user } = useMe();
  const [search, setSearch] = useState("");
  const [coverage] = useState(60);

  const firstName = user
    ? user.email.split("@")[0].replace(/^[^a-z]+|[^a-z]+$/gi, "")
    : undefined;
  const greeting = firstName
    ? `${firstName.charAt(0).toUpperCase()}${firstName.slice(1)}`
    : "there";

  useEffect(() => {
    document.title = "DocuShield — Dashboard";
  }, []);

  return (
    <section className="ds-home">
      <header className="ds-home__hero">
        <div className="ds-home__intro">
          <p className="ds-home__eyebrow">Overview</p>
          <h1>Good to see you, {greeting}</h1>
          <p className="ds-home__sub">
            Triage contract risk, clear the review queue, and keep escalations
            under control.
          </p>
        </div>

        <div className="ds-home__hero-actions">
          <div className="ds-home__date">{today}</div>
          <label className="ds-home__search">
            <Search size={16} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search contracts, clauses, risks…"
              aria-label="Search"
            />
          </label>
          <Link className="ds-home__cta" href="/dashboard/upload">
            <Upload size={16} />
            Upload contract
          </Link>
        </div>
      </header>

      <section className="ds-home__kpis" aria-label="Workspace metrics">
        {KPIS.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <article
              key={kpi.label}
              className={`ds-kpi ds-kpi--${kpi.tone}${kpi.featured ? " is-featured" : ""}`}
            >
              <div className="ds-kpi__top">
                <span className="ds-kpi__icon">
                  <Icon size={18} />
                </span>
                <span className={`ds-kpi__delta${kpi.up ? " is-up" : " is-down"}`}>
                  {kpi.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {kpi.delta}
                </span>
              </div>
              <p className="ds-kpi__label">{kpi.label}</p>
              <strong className="ds-kpi__value">{kpi.value}</strong>
              <span className="ds-kpi__hint">{kpi.hint}</span>
            </article>
          );
        })}
      </section>

      <div className="ds-home__grid">
        <section className="ds-panel ds-queue">
          <div className="ds-panel__head">
            <div>
              <h2>Review queue</h2>
              <p>Contracts waiting on human confirmation</p>
            </div>
            <Link href="/dashboard/risk-review">Open queue</Link>
          </div>
          <ul className="ds-queue__list">
            {QUEUE.map((item) => (
              <li key={item.title}>
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.meta}</span>
                </div>
                <em className={`ds-risk ds-risk--${item.tone}`}>{item.risk}</em>
              </li>
            ))}
          </ul>
        </section>

        <aside className="ds-home__side">
          <section className="ds-panel ds-coverage">
            <div className="ds-panel__head">
              <div>
                <h2>Risk coverage</h2>
                <p>Clauses scored this week</p>
              </div>
            </div>
            <div className="ds-coverage__meter" aria-label={`Coverage ${coverage}%`}>
              <div
                className="ds-coverage__ring"
                style={{
                  background: `conic-gradient(#35c1b6 ${coverage}%, #e5ebf0 0)`,
                }}
              >
                <div className="ds-coverage__core">
                  <strong>{coverage}%</strong>
                  <span>covered</span>
                </div>
              </div>
              <ul>
                <li>
                  <i className="is-mint" />
                  Rule engine
                </li>
                <li>
                  <i className="is-blue" />
                  LLM fallback
                </li>
                <li>
                  <i className="is-slate" />
                  Pending
                </li>
              </ul>
            </div>
          </section>

          <section className="ds-panel ds-profile">
            <div className="ds-profile__row">
              <span className="ds-profile__avatar" aria-hidden="true">
                {greeting.slice(0, 1).toUpperCase()}
              </span>
              <div>
                <strong>{greeting}</strong>
                <span>Legal workspace</span>
              </div>
              <button type="button" aria-label="Notifications" className="ds-profile__bell">
                <Bell size={16} />
              </button>
            </div>
          </section>

          <section className="ds-panel ds-tools">
            <div className="ds-panel__head">
              <div>
                <h2>Quick actions</h2>
                <p>Jump into the workflow</p>
              </div>
            </div>
            <div className="ds-tools__grid">
              {TOOLS.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.label}
                    href={tool.href}
                    className={`ds-tool ds-tool--${tool.tone}`}
                  >
                    <Icon size={18} />
                    <span>{tool.label}</span>
                  </Link>
                );
              })}
            </div>
          </section>
        </aside>
      </div>

      <section className="ds-panel ds-activity">
        <div className="ds-panel__head">
          <div>
            <h2>Contract review activity</h2>
            <p>Analysed · in review · needs action</p>
          </div>
          <div className="ds-activity__legend">
            <span>
              <i className="is-navy" />
              Analysed
            </span>
            <span>
              <i className="is-blue" />
              In review
            </span>
            <span>
              <i className="is-mint" />
              Needs action
            </span>
          </div>
        </div>
        <div className="ds-activity__chart" aria-hidden="true">
          {BARS.map((height, index) => (
            <div className="ds-activity__col" key={index}>
              <b style={{ height: `${height}%` }} />
              <b className="is-blue" style={{ height: `${Math.max(18, height - 18)}%` }} />
              <b className="is-mint" style={{ height: `${Math.max(12, height - 34)}%` }} />
              <em>
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
              </em>
            </div>
          ))}
        </div>
      </section>

      <section className="ds-panel ds-tip">
        <AlertTriangle size={18} />
        <div>
          <strong>Escalation tip</strong>
          <p>
            High-risk clauses escalate to Slack automatically once confidence
            clears the review threshold.
          </p>
        </div>
      </section>
    </section>
  );
}
