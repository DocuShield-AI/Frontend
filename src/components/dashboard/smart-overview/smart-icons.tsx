"use client";

import type { ReactNode } from "react";

/* Exact 24×24 stroke-icon set from the reference — one hidden <symbols> block
   defines every symbol with the reference path data; <I /> renders them. */

export function SmartIconDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        <symbol id="shd-speed" viewBox="0 0 24 24"><path d="M4 16a8 8 0 1 1 16 0" /><path d="M12 16l3-4" /></symbol>
        <symbol id="shd-home" viewBox="0 0 24 24"><path d="M4 11l8-7 8 7v8.5a.5.5 0 0 1-.5.5H4.5a.5.5 0 0 1-.5-.5z" /><path d="M9.5 20v-5.5h5V20" /></symbol>
        <symbol id="shd-phone" viewBox="0 0 24 24"><rect x="7" y="3" width="10" height="18" rx="2.5" /><path d="M11 18h2" /></symbol>
        <symbol id="shd-shield" viewBox="0 0 24 24"><path d="M12 3l7 3v5.5c0 4.4-2.9 7.6-7 9.5-4.1-1.9-7-5.1-7-9.5V6z" /></symbol>
        <symbol id="shd-stats" viewBox="0 0 24 24"><path d="M6 20v-7M12 20V5M18 20v-10" /></symbol>
        <symbol id="shd-user" viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.6" /><path d="M5 20c.6-3.6 3.4-5.4 7-5.4s6.4 1.8 7 5.4" /></symbol>
        <symbol id="shd-power" viewBox="0 0 24 24"><path d="M12 3v8" /><path d="M7 6.5a8 8 0 1 0 10 0" /></symbol>
        <symbol id="shd-sofa" viewBox="0 0 24 24"><path d="M8 4h5l5 5v11a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" /><path d="M13 4v5h5M9 13h6M9 17h4" /></symbol>
        <symbol id="shd-bed" viewBox="0 0 24 24"><path d="M9 12l2.2 2.2L16 9.4" /><circle cx="12" cy="12" r="8.2" /></symbol>
        <symbol id="shd-shelf" viewBox="0 0 24 24"><path d="M6 4v16M6 4h9l3 3v13H6" /><path d="M15 4v3h3M9 11h6M9 15h4" /></symbol>
        <symbol id="shd-kitchen" viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.2" /><path d="M6 20c.7-3.4 3.2-5 6-5s5.3 1.6 6 5" /></symbol>
        <symbol id="shd-therm" viewBox="0 0 24 24"><path d="M10 14.5V5a2 2 0 0 1 4 0v9.5a4 4 0 1 1-4 0z" /><path d="M12 9v7" /></symbol>
        <symbol id="shd-drop" viewBox="0 0 24 24"><path d="M12 3.5C9 8 6.5 10.6 6.5 14a5.5 5.5 0 0 0 11 0c0-3.4-2.5-6-5.5-10.5z" /><path d="M10 15l4-4M10.2 11.2h.01M13.8 14.8h.01" /></symbol>
        <symbol id="shd-ac" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="7" rx="2" /><path d="M6 15c0 2 1 3 1 4M12 15v4M18 15c0 2-1 3-1 4M6 9h5" /></symbol>
        <symbol id="shd-router" viewBox="0 0 24 24"><circle cx="12" cy="11" r="1.8" /><path d="M12 13v7M8.5 7.5a5 5 0 0 0 0 7M15.5 7.5a5 5 0 0 1 0 7M6 5a8.5 8.5 0 0 0 0 12M18 5a8.5 8.5 0 0 1 0 12" /></symbol>
        <symbol id="shd-speaker" viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="2" /><circle cx="12" cy="9" r="1.6" /><circle cx="12" cy="15" r="3" /></symbol>
        <symbol id="shd-lamp" viewBox="0 0 24 24"><path d="M12 2v6M6 15a6 6 0 0 1 12 0zM12 15v5M9.5 20h5" /></symbol>
        <symbol id="shd-chev-u" viewBox="0 0 24 24"><path d="M6 14l6-6 6 6" /></symbol>
        <symbol id="shd-chev-d" viewBox="0 0 24 24"><path d="M6 10l6 6 6-6" /></symbol>
        <symbol id="shd-chat" viewBox="0 0 24 24"><path d="M5 18l-1 3 4-2a8 8 0 1 0-3-1z" /></symbol>
        <symbol id="shd-bell" viewBox="0 0 24 24"><path d="M6 17V11a6 6 0 0 1 12 0v6l1.5 1.5h-15zM10 21h4" /></symbol>
        <symbol id="shd-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6" /><path d="M16 16l4 4" /></symbol>
      </defs>
    </svg>
  );
}

/** Renders one reference symbol through <use>, exactly like the source markup. */
export function I({ name, children }: { name: string; children?: ReactNode }) {
  return (
    <svg
      className="i"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <use href={`#${name}`} />
      {children}
    </svg>
  );
}

export const BRAND_MARK = (
  <svg viewBox="0 0 34 34"><path d="M5 15L17 5l12 10v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z" /><rect x="12" y="13" width="10" height="14" rx="2" /><path d="M15 24h4" /></svg>
);
