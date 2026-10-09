"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "korea-stories-visit-day";
const NAMESPACE = "korea-stories";

const PROD_HOSTS = ["korea-stories.vercel.app"];

// Test/bot/preview traffic only reads the count; it never increments it.
function isTestTraffic() {
  if (typeof window === "undefined") return true;
  if (navigator.webdriver) return true;
  if (/headless|bot|crawler|spider|lighthouse/i.test(navigator.userAgent)) return true;
  return !PROD_HOSTS.includes(window.location.hostname);
}

export function VisitorCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const today = new Date().toLocaleDateString("en-CA");
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      stored = null;
    }
    const skip = isTestTraffic();
    const mode = stored === today || skip ? "get" : "hit";
    fetch(`https://abacus.jasoncameron.dev/${mode}/${NAMESPACE}/visits`)
      .then((response) => (response.ok ? response.json() : Promise.reject(response)))
      .then((data: { value?: unknown }) => {
        if (typeof data.value === "number") setCount(data.value);
        if (stored !== today && !skip) {
          try {
            localStorage.setItem(STORAGE_KEY, today);
          } catch {
            /* private mode */
          }
        }
      })
      .catch(() => {});
  }, []);

  if (count === null) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-muted" aria-label="방문자">
        👁
      </span>
    );
  }

  const label = count.toLocaleString("ko-KR");
  return (
    <span
      className="inline-flex items-center gap-1 text-xs text-muted tabular-nums"
      aria-label={`방문자 ${label}명`}
    >
      <span aria-hidden="true">👁</span>
      {label}
    </span>
  );
}
