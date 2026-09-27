"use client";
import { useEffect, useState } from "react";
import { rateLimitState } from "@/lib/api";
export function useRateLimitState() { const [retryAfter, setRetryAfter] = useState(0); useEffect(() => { const update = () => setRetryAfter(rateLimitState.getSeconds()); update(); const unsubscribe = rateLimitState.subscribe(update); const interval = window.setInterval(update, 1_000); return () => { unsubscribe(); window.clearInterval(interval); }; }, []); return { retryAfter, isRateLimited: retryAfter > 0 }; }
