"use client";

import { useEffect, useRef, useState } from "react";

/* Review-volume samples for the dashboard activity chart. */
const SETS = [
  [[105, 125, 60], [40, 170, 222], [135, 120, 47], [158, 190, 93], [152, 125, 242], [35, 248, 62], [117, 78, 37]],
  [[90, 140, 75], [120, 95, 160], [60, 180, 40], [200, 70, 110], [85, 150, 190], [140, 60, 95], [70, 210, 55]],
];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const SERIES = [
  { label: "Analysed", color: "var(--sd-indigo)" },
  { label: "In review", color: "var(--sd-lav)" },
  { label: "Needs action", color: "var(--sd-mint)" },
];
const AXIS = ["250", "200", "150", "100", "50", "0"];

export function DashboardSmartActivity() {
  const [range, setRange] = useState(0);
  const [draw, setDraw] = useState(false);
  const plotRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  // Measure the plot so bars scale exactly like the reference
  // (H = plotHeight - padding) and re-scale on resize.
  useEffect(() => {
    const plot = plotRef.current;
    if (!plot) return;
    const measure = () => setHeight(plot.clientHeight - 25);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(plot);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setDraw(true));
    return () => cancelAnimationFrame(frame);
  }, [range]);

  return (
    <section className="card spend">
      <div className="hd">
        <span className="ttl">Contract review activity</span>
        <div className="leg">
          {SERIES.map((series) => (
            <span key={series.label}>
              <i style={{ background: series.color }} />
              {series.label}
            </span>
          ))}
        </div>
        <select
          className="sel"
          aria-label="Range"
          value={range}
          onChange={(event) => {
            setDraw(false);
            setRange(Number(event.target.value));
          }}
        >
          <option value="0">Last Week</option>
          <option value="1">This Week</option>
        </select>
      </div>
      <div className="chart">
        <div className="ax">
          {AXIS.map((tick) => (
            <span key={tick}>{tick}</span>
          ))}
        </div>
        <div className="plot" ref={plotRef}>
          {DAYS.map((day, dayIndex) => (
            <div className="day" key={day}>
              <div className="bars">
                {SETS[range][dayIndex].map((barValue, barIndex) => (
                  <b
                    key={barIndex}
                    style={{
                      height: draw ? `${(barValue / 250) * height}px` : "0px",
                      background: SERIES[barIndex].color,
                    }}
                  />
                ))}
              </div>
              <em>{day}</em>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
