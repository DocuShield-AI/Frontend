"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Calendar, Check, CreditCard, LockKeyhole, ShieldCheck, UserRound } from "lucide-react";
import { PaymentCardPreview, type CardBrand } from "./payment-card-preview";

type PaymentDetails = { name: string; number: string; expiry: string };

const blankPayment: PaymentDetails = { name: "", number: "", expiry: "" };

function digits(value: string) {
  return value.replace(/\D/g, "");
}

function formatCardNumber(value: string) {
  return digits(value).slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
}

function formatExpiry(value: string) {
  let clean = digits(value).slice(0, 4);
  if (clean.length === 1 && Number(clean) > 1) clean = `0${clean}`;
  return clean.length > 2 ? `${clean.slice(0, 2)}/${clean.slice(2)}` : clean;
}

function isExpiryValid(value: string) {
  const match = /^(\d{2})\/(\d{2})$/.exec(value);
  return Boolean(match && Number(match[1]) >= 1 && Number(match[1]) <= 12);
}

function detectBrand(value: string): CardBrand {
  const d = digits(value);
  if (!d) return "neutral";
  if (d[0] === "4") return "visa";
  const n2 = Number(d.slice(0, 2));
  const n4 = Number(d.slice(0, 4));
  if (d.length >= 4
    ? ((n2 >= 51 && n2 <= 55) || (n4 >= 2221 && n4 <= 2720))
    : (d.length >= 2 && ((n2 >= 51 && n2 <= 55) || (n2 >= 22 && n2 <= 27)))) return "mc";
  return "neutral";
}

const sleep = (ms: number) => new Promise<void>((resolve) => { window.setTimeout(resolve, ms); });

const brandBadge: Record<CardBrand, React.ReactNode> = {
  visa: <span className="billing-checkout__brand-inline">VISA</span>,
  mc: <span className="billing-checkout__brand-inline is-mc"><i /><i /></span>,
  neutral: <span className="billing-checkout__brand-inline" />,
};

export function BillingCheckout() {
  const router = useRouter();
  const [payment, setPayment] = useState<PaymentDetails>(blankPayment);
  const [flipped, setFlipped] = useState(false);
  const [status, setStatus] = useState<"idle" | "processing" | "success">("idle");
  const [submitted, setSubmitted] = useState(false);
  const [shakeSeq, setShakeSeq] = useState(0);
  const [ringFinished, setRingFinished] = useState(false);
  const [showAgain, setShowAgain] = useState(false);
  const runRef = useRef(0);
  const cvcRef = useRef<HTMLInputElement>(null);
  const [cvcLength, setCvcLength] = useState(0);

  const brand = detectBrand(payment.number);
  const nameOk = payment.name.trim().length > 1;
  const numberOk = digits(payment.number).length === 16;
  const expiryOk = isExpiryValid(payment.expiry);
  const cvcOk = cvcLength === 3;
  const valid = nameOk && numberOk && expiryOk && cvcOk;

  function updatePayment(field: keyof PaymentDetails, value: string) {
    setPayment((current) => ({ ...current, [field]: value }));
  }

  function fieldKey(id: string, ok: boolean) {
    return submitted && !ok ? `${id}-invalid-${shakeSeq}` : `${id}-valid`;
  }

  async function handlePay(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status !== "idle") return;
    setSubmitted(true);
    if (!valid) {
      setShakeSeq((seq) => seq + 1);
      return;
    }

    // Visual-only demo: card data is never persisted or sent anywhere.
    const active = document.activeElement;
    if (active instanceof HTMLElement) active.blur();
    setFlipped(false);

    const run = ++runRef.current;
    await sleep(250);
    if (run !== runRef.current) return;
    setStatus("processing");
    await sleep(3200);
    if (run !== runRef.current) return;
    setStatus("success");
    await sleep(900);
    if (run !== runRef.current) return;
    setRingFinished(true);
    await sleep(900);
    if (run !== runRef.current) return;
    setShowAgain(true);
    await sleep(900);
    if (run !== runRef.current) return;
    router.push("/dashboard/settings/billing/receipt");
  }

  function reset() {
    runRef.current += 1;
    setPayment(blankPayment);
    setFlipped(false);
    setSubmitted(false);
    setStatus("idle");
    setRingFinished(false);
    setShowAgain(false);
    setCvcLength(0);
    if (cvcRef.current) cvcRef.current.value = "";
  }

  return (
    <section className={`billing-checkout ${status !== "idle" ? "billing-checkout--processing" : ""} ${status === "success" ? "billing-checkout--success" : ""}`}>
      <header className="billing-checkout__header">
        <div className="billing-checkout__brand">
          <span><CreditCard size={18} /></span>
          <div><b>DOCUSHIELD</b> <em>PAYMENTS</em></div>
        </div>
        <nav className="billing-checkout__steps" aria-label="Checkout steps">
          <div className="billing-checkout__step"><i className="dot"><Check size={12} strokeWidth={3} /></i>Plan</div>
          <div className="billing-checkout__step"><i className="dot"><Check size={12} strokeWidth={3} /></i>Workspace</div>
          <div className="billing-checkout__step is-on"><i className="dot">3</i>Payment method</div>
        </nav>
      </header>

      <aside className="billing-checkout__preview">
        <PaymentCardPreview payment={payment} brand={brand} flipped={flipped} status={status} />
        <div className="billing-checkout__badges">
          <span className="badge"><ShieldCheck size={14} />256-Bit SSL Encrypted</span>
          <span className="badge"><LockKeyhole size={14} />PCI-DSS Compliant</span>
        </div>
        <div className="billing-checkout__status" role="status" aria-live="polite">
          <div className="billing-checkout__s-proc">Processing Secure Transaction...</div>
          <div className="billing-checkout__s-done">
            <svg className={`billing-checkout__ring ${ringFinished ? "is-fin" : ""}`} viewBox="0 0 34 34" aria-hidden="true">
              <circle cx="17" cy="17" r="12" />
              <path d="M11.5 17.5l4 4 7.5-8" />
            </svg>
            <h3>Payment Successful!</h3>
            <p>Your transaction of <b>$1,234.00</b> has been processed successfully.</p>
            <button className={`billing-checkout__again ${showAgain ? "is-show" : ""}`} type="button" onClick={reset}>Start over</button>
          </div>
        </div>
      </aside>

      <section className="billing-checkout__form-panel">
        <h2>Payment details</h2>
        <p className="billing-checkout__sub">Enter your card information to complete the transaction</p>
        <form onSubmit={handlePay} noValidate autoComplete="off">
          <PaymentField id="name" label="CARDHOLDER NAME" key={fieldKey("name", nameOk)} valid={nameOk} invalid={submitted && !nameOk}
            icon={<UserRound size={17} />}>
            <input id="name" value={payment.name} onChange={(event) => updatePayment("name", event.target.value)} autoComplete="cc-name" placeholder="DocuShield workspace owner" />
          </PaymentField>

          <PaymentField id="num" label="CARD NUMBER" key={fieldKey("num", numberOk)} valid={numberOk} invalid={submitted && !numberOk} mono
            icon={<CreditCard size={17} />} trailing={brandBadge[brand]}>
            <input id="num" value={payment.number} onChange={(event) => updatePayment("number", formatCardNumber(event.target.value))} autoComplete="cc-number" inputMode="numeric" placeholder="0000 0000 0000 0000" maxLength={19} />
          </PaymentField>

          <div className="billing-checkout__two-fields">
            <PaymentField id="exp" label="EXPIRY DATE" key={fieldKey("exp", expiryOk)} valid={expiryOk} invalid={submitted && !expiryOk} mono
              icon={<Calendar size={17} />}>
              <input id="exp" value={payment.expiry} onChange={(event) => updatePayment("expiry", formatExpiry(event.target.value))} autoComplete="cc-exp" inputMode="numeric" placeholder="MM/YY" maxLength={5} />
            </PaymentField>
            <PaymentField id="cvc" label="CVV / CVC" key={fieldKey("cvc", cvcOk)} valid={cvcOk} invalid={submitted && !cvcOk} mono
              icon={<LockKeyhole size={17} />}>
              <input ref={cvcRef} id="cvc" onChange={(event) => { event.currentTarget.value = digits(event.currentTarget.value).slice(0, 3); setCvcLength(event.currentTarget.value.length); }} onFocus={() => setFlipped(true)} onBlur={() => setFlipped(false)} type="password" autoComplete="cc-csc" inputMode="numeric" maxLength={3} placeholder="•••" />
            </PaymentField>
          </div>

          <div className="billing-checkout__amount"><span>Payment amount:</span><b>$1,234</b></div>
          <button className={`billing-checkout__pay ${submitted && !valid ? "is-shake" : ""}`} key={submitted && !valid ? `pay-${shakeSeq}` : "pay"} type="submit">
            PAY $1,234 NOW <ArrowRight size={18} />
          </button>
        </form>
      </section>
    </section>
  );
}

function PaymentField({ children, icon, id, invalid, label, mono, trailing, valid }: {
  children: React.ReactNode;
  icon: React.ReactNode;
  id: string;
  invalid: boolean;
  label: string;
  mono?: boolean;
  trailing?: React.ReactNode;
  valid: boolean;
}) {
  return (
    <label htmlFor={id} className={`billing-payment-field ${mono ? "billing-payment-field--mono" : ""} ${valid ? "is-valid" : ""} ${invalid ? "is-invalid" : ""}`}>
      <span>{label}</span>
      <div>{icon}{children}{trailing}</div>
    </label>
  );
}
