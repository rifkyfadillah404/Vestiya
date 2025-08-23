import { useEffect } from "react";

export default function ScrollReveal({ threshold = 0.15, rootMargin = "0px 0px -10% 0px", once = true }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const observed = new Set();

    const onIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.classList.add("is-visible");
          if (once) {
            observer.unobserve(el);
            observed.delete(el);
          }
        }
      });
    };

    const observer = new IntersectionObserver(onIntersect, { threshold, rootMargin });

    const observeEl = (el) => {
      if (!(el instanceof HTMLElement)) return;
      if (observed.has(el)) return;

      // Ensure base class exists
      el.classList.add("reveal");

      // Optional delay via data attribute (in ms)
      const delayAttr = el.getAttribute("data-reveal-delay");
      if (delayAttr) {
        const delay = Number.parseInt(delayAttr, 10);
        if (!Number.isNaN(delay)) {
          el.style.setProperty("--reveal-delay", `${delay}ms`);
        }
      }

      observer.observe(el);
      observed.add(el);
    };

    // Observe any existing reveal elements on initial load
    document.querySelectorAll("[data-reveal]").forEach(observeEl);

    // Observe dynamically added nodes (e.g., content injected after fetch)
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;

          if (node.hasAttribute?.("data-reveal")) {
            observeEl(node);
          }
          node.querySelectorAll?.("[data-reveal]").forEach(observeEl);
        });
      }
    });

    mo.observe(document.documentElement, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      observer.disconnect();
      observed.clear();
    };
  }, [threshold, rootMargin, once]);

  return null;
}