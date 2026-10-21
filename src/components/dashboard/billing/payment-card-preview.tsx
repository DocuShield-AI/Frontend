"use client";

import { Fragment } from "react";

type PaymentDetails = { name: string; number: string; expiry: string };
type PaymentStatus = "idle" | "processing" | "success";

export type CardBrand = "visa" | "mc" | "neutral";

const BRANDS: Record<CardBrand, { tier: string; mark: React.ReactNode }> = {
  visa: { tier: "PLATINUM", mark: <span className="payment-card__visa"><em>VISA</em><small>INFINITE</small></span> },
  mc: { tier: "WORLD ELITE", mark: <span className="payment-card__mc"><i /><i /></span> },
  neutral: { tier: "STANDARD", mark: <span className="payment-card__gen" /> },
};

function CardNumber({ value }: { value: string }) {
  const entered = value.replace(/\D/g, "").slice(0, 16);
  return <>
    {Array.from({ length: 16 }, (_, index) => (
      <Fragment key={index}>
        {index > 0 && index % 4 === 0 ? " " : ""}
        {index < entered.length ? entered[index] : <i>•</i>}
      </Fragment>
    ))}
  </>;
}

export function PaymentCardPreview({ brand, flipped, payment, status }: {
  brand: CardBrand;
  flipped: boolean;
  payment: PaymentDetails;
  status: PaymentStatus;
}) {
  const brandStyle = BRANDS[brand];
  return <div className={`payment-card-scene is-${status}`}>
    <div className={`payment-card ${flipped ? "is-flipped" : ""}`} data-brand={brand}>
      <div className="payment-card__face payment-card__front">
        <i className="payment-card__bg payment-card__bg--n" />
        <i className="payment-card__bg payment-card__bg--v" />
        <i className="payment-card__bg payment-card__bg--m" />
        <div className="payment-card__top">
          <i className="payment-card__chip" />
          <svg className="payment-card__wave" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 8c1.5 2.4 1.5 5.6 0 8M13 6c2.5 3.6 2.5 8.4 0 12" /></svg>
          <span className="payment-card__tier">{brandStyle.tier}</span>
        </div>
        <p className="payment-card__number"><CardNumber value={payment.number} /></p>
        <div className="payment-card__details">
          <div><small>CARDHOLDER NAME</small><b>{payment.name.trim().toUpperCase() || "YOUR NAME"}</b></div>
          <div><small>EXPIRES</small><b>{payment.expiry || "MM/YY"}</b></div>
          <div className="payment-card__brandmark">{brandStyle.mark}</div>
        </div>
      </div>
      <div className="payment-card__face payment-card__back">
        <i className="payment-card__stripe" />
        <div className="payment-card__sig">SECURITY CODE PROTECTED<div className="payment-card__sigbox">DocuShield secure entry</div></div>
        <p className="payment-card__fine">Payment details are protected during checkout. Your security code is never shown on this card.</p>
      </div>
    </div>
  </div>;
}
