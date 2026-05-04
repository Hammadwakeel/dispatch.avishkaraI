"use client";

import type Lenis from "lenis";
import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import "lenis/dist/lenis.css";

/**
 * Lenis tuning: lower `lerp` = scroll lags behind input more and glides into place (inertial feel).
 * Omit custom `easing` so Lenis stays in lerp/damping mode for wheel + touch (passing `easing`
 * forces duration-based animation in Lenis’ constructor).
 */
const premiumLenisOptions = {
  autoRaf: true,
  anchors: true,
  /** Gentler catch-up — buttery, premium glide */
  lerp: 0.045,
  syncTouchLerp: 0.048,
  wheelMultiplier: 1,
  touchMultiplier: 1,
  smoothWheel: true,
  syncTouch: true,
  touchInertiaExponent: 1.62,
} as const;

function smoothScrollOpts(lenis: Lenis) {
  return {
    programmatic: false as const,
    lerp: lenis.options.lerp,
  };
}

function keyboardTargetIgnores(el: EventTarget | null): boolean {
  if (!(el instanceof Element)) return false;
  return !!el.closest(
    'input:not([type="checkbox"]):not([type="radio"]):not([type="button"]):not([type="submit"]), textarea, select, [contenteditable="true"], [role="textbox"], [role="slider"], [role="listbox"], [role="menu"], [role="menuitem"], [data-lenis-prevent]',
  );
}

function spaceShouldStayNative(el: EventTarget | null): boolean {
  if (!(el instanceof Element)) return false;
  return !!el.closest(
    'button, a[href], summary, [role="button"], [role="link"], [role="tab"], [role="menuitem"], [role="option"], input, textarea, select',
  );
}

/** Routes keyboard scrolling through Lenis so it matches wheel/trackpad smoothing. */
function LenisKeyboardSmooth() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    const reduced =
      typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const stepLine = () => Math.round((window.visualViewport?.height ?? window.innerHeight) * 0.14);
    const stepPage = () => Math.round((window.visualViewport?.height ?? window.innerHeight) * 0.92);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey) return;
      if (keyboardTargetIgnores(e.target)) return;

      const fromTarget = e.target instanceof Element ? e.target : null;
      if (
        (e.key === "ArrowDown" || e.key === "ArrowUp") &&
        fromTarget?.closest(
          '[role="radiogroup"], [role="slider"], [role="tablist"], [role="menu"], [role="menubar"], [role="tree"], [role="treegrid"]',
        )
      ) {
        return;
      }

      const opts = smoothScrollOpts(lenis);
      let handled = false;

      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          lenis.scrollTo(lenis.targetScroll + stepLine(), opts);
          handled = true;
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          lenis.scrollTo(lenis.targetScroll - stepLine(), opts);
          handled = true;
          break;
        }
        case "PageDown": {
          e.preventDefault();
          lenis.scrollTo(lenis.targetScroll + stepPage(), opts);
          handled = true;
          break;
        }
        case "PageUp": {
          e.preventDefault();
          lenis.scrollTo(lenis.targetScroll - stepPage(), opts);
          handled = true;
          break;
        }
        case " ": {
          if (spaceShouldStayNative(e.target)) return;
          e.preventDefault();
          const delta = e.shiftKey ? -stepPage() : stepPage();
          lenis.scrollTo(lenis.targetScroll + delta, opts);
          handled = true;
          break;
        }
        case "Home": {
          e.preventDefault();
          lenis.scrollTo(0, opts);
          handled = true;
          break;
        }
        case "End": {
          e.preventDefault();
          lenis.scrollTo(lenis.limit, opts);
          handled = true;
          break;
        }
        default:
          break;
      }

      if (handled) {
        e.stopPropagation();
      }
    };

    window.addEventListener("keydown", onKeyDown, { capture: true });
    return () => window.removeEventListener("keydown", onKeyDown, { capture: true });
  }, [lenis]);

  return null;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={premiumLenisOptions}>
      <LenisKeyboardSmooth />
      {children}
    </ReactLenis>
  );
}
