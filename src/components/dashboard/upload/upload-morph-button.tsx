"use client";

import { useEffect, useRef, useState } from "react";
import { Upload } from "lucide-react";

type UploadMorphButtonProps = {
  disabled?: boolean;
  autoStart?: boolean;
  onStart?: () => void;
  onComplete: () => void;
};

const EASE = "cubic-bezier(.65,0,.35,1)";
const SPRING = "cubic-bezier(.34,1.56,.64,1)";

export function UploadMorphButton({
  autoStart = false,
  disabled = false,
  onStart,
  onComplete,
}: UploadMorphButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const tipRef = useRef<HTMLSpanElement>(null);
  const checkRef = useRef<SVGPathElement>(null);
  const [state, setState] = useState<"idle" | "busy" | "done">("idle");

  useEffect(() => {
    if (!autoStart || state !== "idle") return;
    const frameId = requestAnimationFrame(() => buttonRef.current?.click());
    return () => cancelAnimationFrame(frameId);
  }, [autoStart, state]);

  async function animateTo(
    element: HTMLElement,
    properties: Keyframe,
    duration: number,
    easing = EASE,
  ) {
    const animation = element.animate([properties], {
      duration,
      easing,
      fill: "forwards",
    });
    await animation.finished;
    animation.commitStyles?.();
    animation.cancel();
  }

  async function run() {
    const button = buttonRef.current;
    const fill = fillRef.current;
    const tip = tipRef.current;
    const check = checkRef.current;
    if (!button || !fill || !tip || !check || state === "busy") return;
    if (state === "done") {
      reset();
      return;
    }

    onStart?.();
    setState("busy");
    await button.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(.93)" },
        { transform: "scale(1)" },
      ],
      { duration: 240 },
    ).finished;
    button.classList.add("is-morphing");
    await animateTo(
      button,
      { width: "64px", height: "64px", borderRadius: "32px" },
      380,
      SPRING,
    );
    await animateTo(
      button,
      {
        width: "260px",
        height: "30px",
        borderRadius: "15px",
        backgroundColor: "#FFFFFF",
      },
      420,
    );
    button.classList.add("is-progress");
    await animateTo(
      button,
      { width: "280px", height: "14px", borderRadius: "5px" },
      320,
    );

    tip.classList.add("is-visible");
    const duration = 2_900;
    await new Promise<void>((resolve) => {
      let start: number | undefined;
      const frame = (now: number) => {
        start ??= now;
        const raw = Math.min((now - start) / duration, 1);
        const progress =
          raw < 0.5 ? 4 * raw * raw * raw : 1 - Math.pow(-2 * raw + 2, 3) / 2;
        fill.style.width = `${progress * 100}%`;
        tip.style.left = `${progress * 280}px`;
        tip.textContent = `${Math.round(progress * 100)}%`;
        if (raw < 1) requestAnimationFrame(frame);
        else resolve();
      };
      requestAnimationFrame(frame);
    });
    tip.classList.remove("is-visible");
    await new Promise((resolve) => window.setTimeout(resolve, 220));
    button.classList.remove("is-progress");
    button.classList.add("is-success");
    await button.animate(
      [
        {
          width: "280px",
          height: "14px",
          borderRadius: "5px",
          backgroundColor: "#1D546C",
        },
        {
          offset: 0.3,
          width: "130px",
          height: "66px",
          borderRadius: "30px",
          backgroundColor: "#2E7D32",
        },
        {
          offset: 0.6,
          width: "78px",
          height: "108px",
          borderRadius: "50%",
          backgroundColor: "#2E7D32",
        },
        {
          offset: 0.82,
          width: "94px",
          height: "84px",
          borderRadius: "50%",
          backgroundColor: "#2E7D32",
        },
        {
          width: "88px",
          height: "88px",
          borderRadius: "44px",
          backgroundColor: "#2E7D32",
        },
      ],
      { duration: 950, easing: "ease-out", fill: "forwards" },
    ).finished;
    check.classList.add("is-drawn");
    const checkAnimation = check.animate(
      [{ strokeDashoffset: 100 }, { strokeDashoffset: 0 }],
      { duration: 420, easing: "cubic-bezier(.5,0,.2,1)", fill: "forwards" },
    );
    await checkAnimation.finished;
    check.style.strokeDashoffset = "0";
    setState("done");
    onComplete();
  }

  function reset() {
    const button = buttonRef.current;
    const fill = fillRef.current;
    const tip = tipRef.current;
    const check = checkRef.current;
    if (!button || !fill || !tip || !check) return;
    button.getAnimations().forEach((animation) => animation.cancel());
    button.removeAttribute("style");
    button.className = "upload-morph-button";
    fill.style.width = "0";
    tip.style.left = "0";
    tip.textContent = "0%";
    check.classList.remove("is-drawn");
    check.style.opacity = "";
    check.style.strokeDashoffset = "";
    setState("idle");
  }

  return (
    <div className="upload-morph-stage">
      <button
        ref={buttonRef}
        className="upload-morph-button"
        type="button"
        disabled={disabled || state === "busy"}
        onClick={run}
        aria-label={
          state === "done"
            ? "Upload complete. Press to replay"
            : "Upload contract"
        }
      >
        <span className="upload-morph-label">
          <Upload size={19} />
          {state === "done" ? "" : "UPLOAD"}
        </span>
        <span className="upload-morph-fill">
          <span ref={fillRef} />
        </span>
        <span ref={tipRef} className="upload-morph-tip">
          0%
        </span>
        <svg
          className="upload-morph-check"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path ref={checkRef} pathLength="100" d="M6 25 L19 38 L42 10" />
        </svg>
      </button>
      <p>
        {state === "done"
          ? "Upload complete — click the check to replay"
          : "Your document remains encrypted and private"}
      </p>
    </div>
  );
}
