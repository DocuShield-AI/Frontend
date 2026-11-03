"use client";

import { useState } from "react";
import { I } from "./smart-icons";

const DEVICES = [
  { label: "AI analysis", icon: "shd-ac", tone: "c1" },
  { label: "Risk scan", icon: "shd-router", tone: "c2" },
  { label: "Clause search", icon: "shd-speaker", tone: "c3" },
  { label: "Team access", icon: "shd-lamp", tone: "c4" },
];

/* Exact reference avatar — brand-recolored (shirt → Twilight Purple). */
function AvatarArt() {
  return (
    <svg viewBox="0 0 72 72">
      <rect width="72" height="72" fill="#ffe8e8" />
      <path d="M14 34c0-16 10-22 22-22s22 6 22 22v22H14z" fill="#3a2418" />
      <path d="M12 72c2-12 12-16 24-16s22 4 24 16z" fill="#1e3a5f" />
      <rect x="31" y="46" width="10" height="12" rx="4" fill="#f2b39b" />
      <ellipse cx="36" cy="34" rx="13" ry="15" fill="#f6c2ab" />
      <path
        d="M22 30c2-9 8-12 15-12 8 0 13 5 13 14-4-5-9-7-14-7-5 0-10 1-14 5z"
        fill="#3a2418"
      />
      <circle cx="31" cy="35" r="1.4" fill="#3a2418" />
      <circle cx="41" cy="35" r="1.4" fill="#3a2418" />
      <path d="M32 42q4 3 8 0" stroke="#c0564a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* Exact reference illustration — chair & figure recolored to the brand palette. */
function SideIllustration() {
  return (
    <svg className="ill" viewBox="0 0 232 230" aria-hidden="true">
      <rect x="54" y="8" width="34" height="28" fill="#fff" stroke="#f6a9a0" strokeWidth="2" />
      <rect x="62" y="14" width="18" height="14" fill="#f6a9a0" />
      <rect x="104" y="30" width="62" height="34" fill="#fff" stroke="#f6a9a0" strokeWidth="2" />
      <rect x="110" y="38" width="50" height="18" fill="#f6a9a0" />
      <path d="M28 160c-14-22-8-40 6-52 4 18 2 36-6 52zM36 170c6-22 22-34 38-36-6 16-18 30-38 36z" fill="#2e9e3d" />
      <path d="M30 170c0 20 4 40 4 46" stroke="#2e9e3d" strokeWidth="3" fill="none" />
      <path d="M18 196h32l-4 32H22z" fill="#f4b2a8" />
      <path d="M66 150c6-26 40-26 46-4l8 56H72z" fill="#1e3a5f" />
      <rect x="62" y="186" width="70" height="12" rx="6" fill="#1e3a5f" />
      <rect x="76" y="198" width="3" height="30" fill="#1e3a5f" />
      <rect x="120" y="198" width="3" height="30" fill="#1e3a5f" />
      <path d="M92 146c14-14 40-24 66-12l30 16c6 4 6 12-2 12l-30-4-30 8z" fill="#bfe0f6" />
      <path d="M92 150c-8-14 0-26 12-30l18-18" stroke="#1f2937" strokeWidth="7" fill="none" strokeLinecap="round" />
      <circle cx="108" cy="116" r="12" fill="#f6c2ab" />
      <path d="M96 114c0-12 10-16 20-12 2 8-4 14-20 12z" fill="#1f2937" />
      <rect x="130" y="98" width="14" height="24" rx="2" fill="#3a3f55" transform="rotate(20 137 110)" />
      <rect x="174" y="170" width="38" height="8" rx="3" fill="#f4b2a8" />
      <rect x="178" y="178" width="4" height="40" fill="#f4b2a8" />
      <rect x="204" y="178" width="4" height="40" fill="#f4b2a8" />
      <path d="M200 164c-2-18 2-30 6-38" stroke="#f4b2a8" strokeWidth="2" fill="none" />
    </svg>
  );
}

export function DashboardSmartProfile({ name }: { name?: string }) {
  const [off, setOff] = useState<number[]>([]);

  return (
    <>
      <div className="prof">
        <button type="button" aria-label="Messages">
          <I name="shd-chat" />
        </button>
        <span className="avatar">
          <AvatarArt />
        </span>
        <button type="button" aria-label="Notifications">
          <I name="shd-bell" />
        </button>
      </div>
      <div className="welcome">Welcome{name ? ` ${name.charAt(0).toUpperCase()}${name.slice(1)}` : " Zayyam"}!</div>
      <div className="card dev">
        <div className="hd">
          <span className="ttl">Workspace tools</span>
          <span className="dots">•••</span>
        </div>
        <div className="tiles">
          {DEVICES.map((device, index) => {
            const isOff = off.includes(index);
            return (
              <button
                key={device.label}
                type="button"
                className={`tile ${device.tone}${isOff ? " off" : ""}`}
                onClick={() =>
                  setOff((current) =>
                    isOff ? current.filter((item) => item !== index) : [...current, index]
                  )
                }
                aria-pressed={isOff}
              >
                <span className="sq">
                  <I name={device.icon} />
                </span>
                {device.label}
              </button>
            );
          })}
        </div>
      </div>
      <SideIllustration />
    </>
  );
}
