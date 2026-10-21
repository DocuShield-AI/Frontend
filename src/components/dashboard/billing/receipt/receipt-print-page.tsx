"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Copy, FileText, Printer, Scissors } from "lucide-react";

type ReceiptState = "idle" | "printing" | "printed" | "tearing";

const receiptRows = [
  ["Pro workspace subscription", "$1,099.00"],
  ["Clause intelligence add-on", "$99.00"],
  ["Priority support", "$36.00"],
];

export function ReceiptPrintPage() {
  const [title, setTitle] = useState("");
  const [state, setState] = useState<ReceiptState>("idle");
  const [copied, setCopied] = useState(false);
  const receiptText = useMemo(() => "DOCUSHIELD\nPAYMENT RECEIPT\nCLIENT: ZAYYAM AHMED\nTOTAL: $1,234.00\nTXN-DS-7451188122", []);

  useEffect(() => {
    const text = "Your payment receipt";
    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setTitle(text.slice(0, index));
      if (index === text.length) window.clearInterval(interval);
    }, 48);
    return () => window.clearInterval(interval);
  }, []);

  function printReceipt() {
    if (state === "printing" || state === "tearing") return;
    setState("printing");
    window.setTimeout(() => setState("printed"), 3_000);
  }

  function tearReceipt() {
    if (state !== "printed") return;
    setState("tearing");
    window.setTimeout(() => setState("idle"), 1_000);
  }

  async function copyReceipt() {
    try { await navigator.clipboard.writeText(receiptText); } catch { /* Clipboard access is optional. */ }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1_400);
  }

  return <section className="ds-receipt-page">
    <header><p>Billing / Payment complete</p><h1>{title}<i aria-hidden="true" /></h1></header>
    <div className="ds-receipt-stage">
      <div className={`ds-receipt-printer ${state === "printing" ? "is-printing" : ""}`} aria-hidden="true" />
      <div className={`ds-receipt-slot ${state !== "idle" ? "is-open" : ""}`}>
        <article className={`ds-receipt ${state === "printing" ? "is-printing" : ""} ${state === "printed" ? "is-printed" : ""} ${state === "tearing" ? "is-tearing" : ""}`}>
          <div className={`ds-receipt-stamp ${state === "printed" ? "is-stamped" : ""}`}><b>PAID</b><small>30 AUG 2026</small></div>
          <div className="ds-receipt-head"><div><strong>DOCUSHIELD</strong><span>WORKSPACE PAYMENT RECEIPT</span></div><ShieldMark /></div>
          <div className="ds-receipt-client"><span>CLIENT: ZAYYAM AHMED</span><span>Visa •••• 4242</span></div>
          <b className="ds-receipt-amount">$1,234.00</b><p className="ds-receipt-date">30 AUGUST 2026 · INVOICE PAID</p><div className="ds-receipt-separator" />
          {receiptRows.map(([label, value]) => <div className="ds-receipt-row" key={label}><span>1× {label}</span><span>{value}</span></div>)}
          <div className="ds-receipt-separator" /><div className="ds-receipt-row is-muted"><span>Subtotal</span><span>$1,234.00</span></div><div className="ds-receipt-row is-muted"><span>Tax</span><span>$0.00</span></div><div className="ds-receipt-total"><span>GRAND TOTAL</span><span>$1,234.00</span></div>
          <p className="ds-receipt-thanks">THANK YOU FOR TRUSTING DOCUSHIELD WITH YOUR CONTRACT WORK.</p><ReceiptBarcode /><p className="ds-receipt-txn">TXN-DS-7451188122</p>
        </article>
      </div>
      <div className="ds-receipt-status"><h2>{state === "printed" ? "Payment successful" : "Receipt ready to print"}</h2><p>{state === "printed" ? "Your DocuShield payment has been confirmed." : "Print a fresh copy of your payment receipt anytime."}</p></div>
      <div className="ds-receipt-actions"><button className="is-primary" type="button" onClick={printReceipt} disabled={state === "printing"}><Printer size={17} />{state === "printing" ? "Printing…" : state === "printed" ? "Re-print receipt" : "Print receipt"}</button>{state === "printed" && <button className="is-tear" type="button" onClick={tearReceipt}><Scissors size={16} />Tear receipt</button>}<button type="button" onClick={copyReceipt}><Copy size={16} />{copied ? "Copied!" : "Copy"}</button></div>
    </div>
  </section>;
}

function ShieldMark() { return <span className="ds-receipt-mark"><FileText size={19} /><Check size={12} /></span>; }

function ReceiptBarcode() { return <div className="ds-receipt-barcode" aria-hidden="true">{[2, 1, 3, 1, 2, 3, 1, 1, 3, 2, 1, 2, 3, 1, 2, 2, 1, 3, 1, 2, 3, 1, 1, 2, 3, 2, 1, 3].map((width, index) => <i key={index} style={{ width }} />)}</div>; }
