import { Link } from "react-router-dom";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import panelBg1 from "@/assets/h-scroll/panel-1.jpg";
import panelBg2 from "@/assets/h-scroll/panel-2.jpg";
import panelBg3 from "@/assets/h-scroll/panel-3.jpg";

function StarIcon({
  filled = false,
  size = 40,
  className = "",
}: {
  filled?: boolean;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "var(--neon-yellow)" : "none"}
      stroke={filled ? "var(--neon-yellow)" : "currentColor"}
      strokeWidth="1.5"
      className={className}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
    </svg>
  );
}

function waitForImages(container: HTMLElement) {
  const images = container.querySelectorAll<HTMLImageElement>("img");
  if (!images.length) return Promise.resolve();

  return Promise.all(
    [...images].map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete && img.naturalWidth > 0) {
            resolve();
            return;
          }
          const done = () => resolve();
          img.addEventListener("load", done, { once: true });
          img.addEventListener("error", done, { once: true });
        }),
    ),
  );
}

export function HorizontalScrollSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let ctx: gsap.Context | undefined;
    let cancelled = false;
    let resizeTimer: ReturnType<typeof setTimeout>;

    const getDistance = () => Math.max(0, track.scrollWidth - section.clientWidth);

    const setup = () => {
      if (cancelled) return;

      ctx?.revert();
      gsap.set(track, { x: 0, force3D: true });

      ctx = gsap.context(() => {
        const panels = track.querySelectorAll<HTMLElement>(".h-panel");

        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getDistance()}`,
            scrub: 1.2,
            pin: true,
            pinReparent: false,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
            onUpdate: (self) => {
              if (progressBarRef.current) {
                progressBarRef.current.style.width = `${self.progress * 100}%`;
              }
            },
          },
        });

        panels.forEach((panel) => {
          const content = panel.querySelector(".panel-content");
          const stars = panel.querySelectorAll<HTMLElement>(".star-icon");
          const cta = panel.querySelector<HTMLElement>(".btn");

          if (content) {
            gsap.fromTo(
              content,
              { opacity: 0, y: 36 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: tween,
                  start: "left 80%",
                  toggleActions: "play none none reverse",
                },
              },
            );
          }

          if (stars.length) {
            gsap.fromTo(
              stars,
              { scale: 0.3, opacity: 0, rotation: -20 },
              {
                scale: 1,
                opacity: 1,
                rotation: 0,
                duration: 0.5,
                stagger: 0.08,
                ease: "back.out(1.7)",
                delay: 0.35,
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: tween,
                  start: "left 70%",
                  toggleActions: "play none none reverse",
                },
              },
            );
          }

          if (cta) {
            gsap.fromTo(
              cta,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.55,
                ease: "power3.out",
                delay: 0.3,
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: tween,
                  start: "left 65%",
                  toggleActions: "play none none reverse",
                },
              },
            );
          }
        });
      }, section);

      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    waitForImages(track).then(setup);

    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 200);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="h-scroll-section relative h-screen overflow-hidden border-t border-[#1E1E1E]"
    >
      <div
        ref={progressBarRef}
        className="pointer-events-none absolute top-0 left-0 z-50 h-[2px] bg-neon transition-none"
        style={{ width: "0%" }}
      />

      <div ref={trackRef} className="h-scroll-track flex h-full will-change-transform">
        <div className="h-panel relative flex h-full w-screen min-w-screen shrink-0 flex-col items-center justify-center px-6 md:px-12">
          <img src={panelBg1} alt="" className="panel-bg-img" decoding="async" />
          <div className="panel-bg-overlay" aria-hidden="true" />
          <div className="panel-content relative z-10 text-center">
            <span
              className="block text-neon font-display font-bold leading-[0.82] tracking-[-0.06em]"
              style={{ fontSize: "clamp(200px, 38vw, 580px)" }}
            >
              111
            </span>
            <p className="mt-8 text-sm tracking-[0.32em] text-[var(--gray-light)] uppercase md:text-base">
              reps · sets · days
            </p>
          </div>
        </div>

        <div className="h-panel relative flex h-full w-screen min-w-screen shrink-0 flex-col items-center justify-center px-6 md:px-16">
          <img src={panelBg2} alt="" className="panel-bg-img" decoding="async" />
          <div className="panel-bg-overlay" aria-hidden="true" />
          <div className="panel-content relative z-10 max-w-7xl text-center">
            <p
              className="font-display font-bold uppercase leading-[0.9] tracking-[-0.045em] text-white"
              style={{ fontSize: "clamp(60px, 10.5vw, 168px)" }}
            >
              DON&apos;T DREAM IT
            </p>
            <p
              className="mt-1 font-display font-bold uppercase leading-[0.9] tracking-[-0.045em] text-neon md:mt-2"
              style={{ fontSize: "clamp(60px, 10.5vw, 168px)" }}
            >
              DO IT!
            </p>
            <div className="mt-12 flex justify-center gap-3 md:gap-5">
              {[0, 1, 2, 3, 4].map((i) => (
                <StarIcon key={i} className="star-icon" filled size={52} />
              ))}
            </div>
          </div>
        </div>

        <div className="h-panel relative flex h-full w-screen min-w-screen shrink-0 flex-col items-center justify-center px-6 md:px-16">
          <img src={panelBg3} alt="" className="panel-bg-img" decoding="async" />
          <div className="panel-bg-overlay" aria-hidden="true" />
          <div className="panel-content relative z-10 max-w-7xl text-center">
            <p
              className="font-display font-bold uppercase leading-[0.92] tracking-[-0.04em] text-white"
              style={{ fontSize: "clamp(52px, 8.5vw, 136px)" }}
            >
              SET YOUR BODY
            </p>
            <p
              className="mt-2 font-display font-bold uppercase leading-[0.92] tracking-[-0.04em] text-neon md:mt-3"
              style={{ fontSize: "clamp(52px, 8.5vw, 136px)" }}
            >
              YOUR OWN AMBITION
            </p>
            <Link
              to="/membership"
              className="btn btn-primary group mt-14 inline-flex items-center gap-3 font-display text-xl font-bold uppercase tracking-wider md:text-2xl"
            >
              See Plans <span className="transition-transform group-hover:translate-x-2">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
