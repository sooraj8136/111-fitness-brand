import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "";
    requestAnimationFrame(() => {
      import("gsap/ScrollTrigger")
        .then((mod) => {
          if (mod && typeof (mod as any).ScrollTrigger?.refresh === "function") {
            (mod as any).ScrollTrigger.refresh();
          } else if (typeof (window as any).gsap?.ScrollTrigger?.refresh === "function") {
            (window as any).gsap.ScrollTrigger.refresh();
          }
        })
        .catch(() => {});
    });
  }, [pathname]);

  return null;
}
