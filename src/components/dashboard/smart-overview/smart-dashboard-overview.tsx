"use client";

import { useEffect, useMemo, useState } from "react";
import { useMe } from "@/hooks/use-me";
import { DashboardRoomCards } from "./dashboard-room-cards";
import { DashboardSmartActivity } from "./dashboard-smart-activity";
import { DashboardSmartControls } from "./dashboard-smart-controls";
import { DashboardSmartProfile } from "./dashboard-smart-profile";
import { I, SmartIconDefs } from "./smart-icons";

/** "Monday, 10 February 2020" — same format as the reference. */
function useReferenceDate() {
  const [now] = useState(() => new Date());
  return useMemo(() => {
    const parts = new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).formatToParts(now);
    const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
    return { weekday: get("weekday"), day: get("day"), month: get("month"), year: get("year") };
  }, [now]);
}

export function SmartDashboardOverview() {
  const { weekday, day, month, year } = useReferenceDate();
  const { data: user } = useMe();
  const firstName = user
    ? user.email.split("@")[0].replace(/^[^a-z]+|[^a-z]+$/gi, "")
    : undefined;
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title = "DocuShield — Dashboard";
  }, []);

  const greetingName = firstName
    ? `${firstName.charAt(0).toUpperCase()}${firstName.slice(1)}`
    : undefined;

  return (
    <section className="smart-dash">
      <SmartIconDefs />
      <div className="app">
        <div className="main">
          <div className="bar">
            <div className="intro">
              <p className="eyebrow">Overview</p>
              <h1>
                {greetingName ? `Good to see you, ${greetingName}` : "Contract risk overview"}
              </h1>
              <p className="sub">
                Track reviews, risk flags, and workspace activity in one place.
              </p>
            </div>
            <div className="bar-tools">
              <div className="date">
                <b>{weekday},</b> {day} {month} {year}
              </div>
              <label className="search">
                <I name="shd-search" />
                <input
                  placeholder="Search contracts, clauses, risks…"
                  aria-label="Search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </label>
            </div>
          </div>

          <DashboardRoomCards />
          <DashboardSmartControls />
          <DashboardSmartActivity />
        </div>

        <aside className="rt">
          <DashboardSmartProfile name={firstName} />
        </aside>
      </div>
    </section>
  );
}
