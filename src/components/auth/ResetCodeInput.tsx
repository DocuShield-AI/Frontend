"use client";

import { useRef } from "react";
import { RESET_CODE_LENGTH } from "@/validations/auth/reset-password";

type ResetCodeInputProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  id?: string;
};

export default function ResetCodeInput({
  value,
  onChange,
  disabled = false,
  id = "reset-code",
}: ResetCodeInputProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = Array.from({ length: RESET_CODE_LENGTH }, (_, i) => value[i] ?? "");

  const updateDigit = (index: number, digit: string) => {
    const next = digits.slice();
    next[index] = digit;
    onChange(next.join("").slice(0, RESET_CODE_LENGTH));
  };

  const handleChange = (index: number, raw: string) => {
    const digit = raw.replace(/\D/g, "").slice(-1);
    updateDigit(index, digit);
    if (digit && index < RESET_CODE_LENGTH - 1) {
      refs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      refs.current[index - 1]?.focus();
      return;
    }

    if (event.key === "ArrowLeft" && index > 0) {
      refs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowRight" && index < RESET_CODE_LENGTH - 1) {
      refs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, RESET_CODE_LENGTH);
    onChange(pasted);
    const focusIndex = Math.min(pasted.length, RESET_CODE_LENGTH - 1);
    refs.current[focusIndex]?.focus();
  };

  return (
    <div
      id={id}
      className="flex justify-center gap-2 sm:gap-2.5"
      role="group"
      aria-label={`${RESET_CODE_LENGTH}-digit reset code`}
    >
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            refs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={1}
          value={digit}
          disabled={disabled}
          aria-label={`Digit ${index + 1} of ${RESET_CODE_LENGTH}`}
          className="h-12 w-10 rounded-lg bg-input text-center font-plus text-lg font-semibold text-text-primary outline-none transition focus:bg-input-focus focus:ring-2 focus:ring-accent/15 disabled:cursor-not-allowed disabled:opacity-60 sm:h-12 sm:w-11"
          onChange={(event) => handleChange(index, event.target.value)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={handlePaste}
          onFocus={(event) => event.target.select()}
        />
      ))}
    </div>
  );
}
