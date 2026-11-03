"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { I } from "./smart-icons";

export function DashboardSmartControls() {
  return (
    <section className="mid">
      <div className="left2">
        <TemperatureCard />
        <HumidityCard />
      </div>
      <LightGaugeCard />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Indoor temperature — tick slider (drag / arrow keys / wheel)         */
/* ------------------------------------------------------------------ */

const TICK_WIDTHS = [6, 10, 14, 18, 14, 18, 14, 10, 14, 18, 14, 10, 6];
const TEMP_MIN = 16;
const TEMP_MAX = 32;

function TemperatureCard() {
  const [temp, setTemp] = useState(25);
  const ticksRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef(false);

  const clamp = useCallback(
    (value: number) => Math.max(TEMP_MIN, Math.min(TEMP_MAX, value)),
    []
  );

  // Reference behaviour: ticks light up from the bottom.
  const tickOpacity = (index: number) => {
    const n = TICK_WIDTHS.length;
    return (n - 1 - index) / (n - 1) <= (temp - TEMP_MIN) / (TEMP_MAX - TEMP_MIN) + 0.08
      ? 0.95
      : 0.3;
  };

  // React registers onWheel passively; attach a non-passive listener natively
  // so preventDefault() works and the page doesn't scroll while adjusting.
  useEffect(() => {
    const el = ticksRef.current;
    if (!el) return;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      setTemp((value) => clamp(value + (event.deltaY < 0 ? 1 : -1)));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [clamp]);

  const pointToTemp = (clientY: number) => {
    const el = ticksRef.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    return clamp(
      Math.round(TEMP_MIN + (TEMP_MAX - TEMP_MIN) * (1 - (clientY - rect.top) / rect.height))
    );
  };

  return (
    <article className="card mini">
      <span className="bub">
        <I name="shd-therm" />
      </span>
      <div className="tx">
        <div className="ttl">Review activity</div>
        <div className="big">
          +<span id="sd-tv">{temp}</span>
          <sup>%</sup>
        </div>
      </div>
      <div className="ctl">
        <div
          className="ticks"
          id="sd-ticks"
          ref={ticksRef}
          aria-label="Review activity"
          role="slider"
          tabIndex={0}
          aria-valuemin={TEMP_MIN}
          aria-valuemax={TEMP_MAX}
          aria-valuenow={temp}
          onPointerDown={(event) => {
            dragRef.current = true;
            event.currentTarget.setPointerCapture(event.pointerId);
            const value = pointToTemp(event.clientY);
            if (value !== null) setTemp(value);
          }}
          onPointerMove={(event) => {
            if (!dragRef.current) return;
            const value = pointToTemp(event.clientY);
            if (value !== null) setTemp(value);
          }}
          onPointerUp={() => {
            dragRef.current = false;
          }}
          onLostPointerCapture={() => {
            dragRef.current = false;
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowUp") setTemp((value) => clamp(value + 1));
            if (event.key === "ArrowDown") setTemp((value) => clamp(value - 1));
          }}
        >
          {TICK_WIDTHS.map((width, index) => (
            <i key={index} style={{ width: `${width}px`, opacity: tickOpacity(index) }} />
          ))}
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Humidity — chevron stepper                                          */
/* ------------------------------------------------------------------ */

function HumidityCard() {
  const [hum, setHum] = useState(30);
  const clamp = useCallback(
    (value: number) => Math.max(0, Math.min(100, value)),
    []
  );
  return (
    <article className="card mini">
      <span className="bub">
        <I name="shd-drop" />
      </span>
      <div className="tx">
        <div className="ttl">Human review queue</div>
        <div className="big">
          <span id="sd-hv">{hum}</span>
          <small>%</small>
        </div>
      </div>
      <div className="ctl">
        <button
          type="button"
          aria-label="Increase humidity"
          onClick={() => setHum((value) => clamp(value + 1))}
        >
          <I name="shd-chev-u" />
        </button>
        <button
          type="button"
          aria-label="Decrease humidity"
          onClick={() => setHum((value) => clamp(value - 1))}
        >
          <I name="shd-chev-d" />
        </button>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Light intensity — knob rides the exact reference SVG track           */
/* (drag anywhere on the gauge; the knob snaps to the nearest point    */
/*  on the path, so the slider actually works)                          */
/* ------------------------------------------------------------------ */

const TRACK_D =
  "M40 122V72Q40 42 70 42H130Q160 42 160 72V122";
const SAMPLES = 400;

function LightGaugeCard() {
  const [value, setValue] = useState(60);
  const [knob, setKnob] = useState({ x: 40, y: 122 });
  const trackRef = useRef<SVGPathElement>(null);
  const gaugeRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef(false);

  const positionKnob = useCallback((next: number) => {
    const track = trackRef.current;
    if (!track) return;
    const length = track.getTotalLength();
    const point = track.getPointAtLength((length * next) / 100);
    setKnob({ x: point.x, y: point.y });
  }, []);

  // Place the knob once the path is measurable, and keep it on the path
  // when the card resizes.
  useEffect(() => {
    positionKnob(60);
    const gauge = gaugeRef.current;
    if (!gauge) return;
    const observer = new ResizeObserver(() => {
      setValue((current) => {
        positionKnob(current);
        return current;
      });
    });
    observer.observe(gauge);
    return () => observer.disconnect();
  }, [positionKnob]);

  // Pointer position → viewBox coords → nearest point on the track.
  const pointerToValue = (clientX: number, clientY: number) => {
    const track = trackRef.current;
    const gauge = gaugeRef.current;
    if (!track || !gauge) return null;
    const rect = gauge.getBoundingClientRect();
    const scale = 200 / rect.width; // viewBox is 200×150, aspect locked by CSS
    const x = (clientX - rect.left) * scale;
    const y = (clientY - rect.top) * scale;
    const length = track.getTotalLength();
    let best = 0;
    let bestDistance = Infinity;
    for (let step = 0; step <= SAMPLES; step++) {
      const target = (length * step) / SAMPLES;
      const point = track.getPointAtLength(target);
      const distance = (point.x - x) ** 2 + (point.y - y) ** 2;
      if (distance < bestDistance) {
        bestDistance = distance;
        best = step;
      }
    }
    return Math.max(0, Math.min(100, Math.round((best / SAMPLES) * 100)));
  };

  return (
    <article className="card light">
      <header className="hd">
        <span className="ttl">Risk coverage</span>
        <span className="dots">•••</span>
      </header>
      <div
        className="gauge"
        id="sd-gauge"
        ref={gaugeRef}
        role="slider"
        aria-label="Risk coverage"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        tabIndex={0}
        onPointerDown={(event) => {
          dragRef.current = true;
          event.currentTarget.setPointerCapture(event.pointerId);
          const next = pointerToValue(event.clientX, event.clientY);
          if (next !== null) {
            setValue(next);
            positionKnob(next);
          }
        }}
        onPointerMove={(event) => {
          if (!dragRef.current) return;
          const next = pointerToValue(event.clientX, event.clientY);
          if (next !== null) {
            setValue(next);
            positionKnob(next);
          }
        }}
        onPointerUp={() => {
          dragRef.current = false;
        }}
        onLostPointerCapture={() => {
          dragRef.current = false;
        }}
        onKeyDown={(event) => {
          const bump =
            event.key === "ArrowRight" || event.key === "ArrowUp"
              ? 2
              : event.key === "ArrowLeft" || event.key === "ArrowDown"
                ? -2
                : 0;
          if (bump === 0) return;
          const next = Math.max(0, Math.min(100, value + bump));
          setValue(next);
          positionKnob(next);
        }}
      >
        <svg viewBox="0 0 200 150" aria-hidden="true">
          <path
            d="M24 122V70Q24 24 70 24H130Q176 24 176 70V122"
            fill="none"
            stroke="#d6dce2"
            strokeWidth="7"
            strokeDasharray="1 6.2"
            opacity=".7"
          />
          <path d="M40 122V92" stroke="#1e3a5f" strokeWidth="6" strokeLinecap="butt" fill="none" />
          <path d="M40 92V72Q40 42 70 42H88" stroke="#3395ca" strokeWidth="6" fill="none" />
          <path d="M88 42H130" stroke="#b9e6e2" strokeWidth="6" fill="none" />
          <path d="M130 42Q160 42 160 72V92" stroke="#35c1b6" strokeWidth="6" fill="none" />
          <path d="M160 92V122" stroke="#c0392b" strokeWidth="6" fill="none" />
          <path ref={trackRef} d={TRACK_D} fill="none" stroke="none" />
          <circle
            id="sd-knob"
            r="9"
            cx={knob.x}
            cy={knob.y}
            fill="#fff"
            stroke="#5a6b7b"
            strokeWidth="2.2"
            style={{
              filter: "drop-shadow(0 2px 3px rgba(0,0,0,.25))",
              cursor: "grab",
            }}
          />
        </svg>
        <div className="core">
          <span>
            <span id="sd-lv">{value}</span>
            <small>%</small>
          </span>
        </div>
        <span className="lb" style={{ left: "-2%" }}>
          0
        </span>
        <span className="lb" style={{ right: "-4%" }}>
          100
        </span>
      </div>
    </article>
  );
}
