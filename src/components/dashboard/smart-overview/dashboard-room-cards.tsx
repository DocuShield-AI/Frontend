"use client";

import { useState } from "react";
import { I } from "./smart-icons";

/* Product metrics retain the reference card interactions and visual rhythm. */
const ROOMS = [
  ["Active contracts", "shd-stats", 174, 25, "tone-mint"],
  ["Ready for review", "shd-bed", 48, 66, "tone-blue"],
  ["Risk flags", "shd-shield", 289, 80, "tone-rose"],
  ["Team members", "shd-user", 21, 72, "tone-navy"],
] as const;

export function DashboardRoomCards() {
  const [active, setActive] = useState(1);
  const C = 2 * Math.PI * 21; // ring circumference @ r=21

  return (
    <section className="rooms" aria-label="Workspace metrics">
      {ROOMS.map(([label, icon, value, progress, tone], index) => (
        <button
          key={label}
          type="button"
          className={`card room ${tone}${active === index ? " on" : ""}`}
          onClick={() => setActive(index)}
        >
          <span className="hd">
            <span className="ttl">{label}</span>
            <span className="delta">{progress}%</span>
          </span>
          <span className="bd">
            <span className="metric-ring">
              <svg className="r" viewBox="0 0 54 54">
                <circle className="t" cx="27" cy="27" r="21" />
                <circle
                  className="p"
                  cx="27"
                  cy="27"
                  r="21"
                  strokeDasharray={`${(C * progress) / 100} ${C}`}
                />
              </svg>
              <span className="core">
                <I name={icon} />
              </span>
            </span>
            <span className="val">
              {value}
              <small>{label === "Risk flags" ? "flags" : "this month"}</small>
            </span>
          </span>
        </button>
      ))}
    </section>
  );
}
