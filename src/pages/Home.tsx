import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { ReviewMarquee } from "../components/site/ReviewMarquee";

export function Home() {
  useEffect(() => {
    document.title = "111 Fitness Club | Tirur, Kerala — 4.7★ Rated Gym";
  }, []);
  const heroRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const horizontalContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let cancelled = false;
    const triggers: Array<{ kill: (revert?: boolean) => void }> = [];
    const tweens: Array<{ kill: () => void }> = [];

    (async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      const gsap = gsapMod.default;
      const ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const letters = heroRef.current?.querySelectorAll(".hero-letter");
      if (letters?.length) {
        tweens.push(gsap.from(letters, { y: 80, opacity: 0, duration: 0.6, ease: "power4.out", stagger: 0.04, delay: 0.15 }));
      }
      const sub = heroRef.current?.querySelector(".hero-sub");
      if (sub) tweens.push(gsap.from(sub, { y: 20, opacity: 0, duration: 0.6, delay: 1.0 }));

      revealRef.current?.querySelectorAll(".reveal").forEach((el) => {
        const tween = gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 85%" },
          y: 60, opacity: 0, duration: 0.75, ease: "power3.out",
        });
        tweens.push(tween);
        if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
      });

      // Horizontal Scroll Pin
      if (horizontalRef.current && horizontalContainerRef.current) {
        const tween = gsap.to(horizontalContainerRef.current, {
          x: () => -(horizontalContainerRef.current!.scrollWidth - window.innerWidth) + "px",
          ease: "none",
          scrollTrigger: {
            trigger: horizontalRef.current,
            pin: true,
            scrub: 1,
            end: () => "+=" + horizontalContainerRef.current!.offsetWidth,
            invalidateOnRefresh: true,
          }
        });
        tweens.push(tween);
        if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);

        const panels = gsap.utils.toArray<HTMLElement>('.h-panel', horizontalContainerRef.current);
        panels.forEach((panel, i) => {
          if (i === 0) return; // Panel A is already visible
          const content = panel.querySelector('.panel-content');
          if (content) {
            const fadeTween = gsap.from(content, {
              opacity: 0,
              x: 100,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tween,
                start: "left 85%",
                end: "left 35%",
                scrub: true,
              }
            });
            tweens.push(fadeTween);
            if (fadeTween.scrollTrigger) triggers.push(fadeTween.scrollTrigger);
          }
        });
      }
    })();

    return () => {
      cancelled = true;
      triggers.forEach((t) => t.kill(true));
      tweens.forEach((t) => t.kill());
    };
  }, []);

  const built = "BUILT".split("");
  const different = "DIFFERENT.".split("");

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative flex min-h-[92vh] items-center overflow-hidden px-6">
        <div className="mx-auto w-full max-w-7xl">
          <h1 className="font-display font-bold text-white" style={{ fontSize: "clamp(64px, 11vw, 148px)", letterSpacing: "-0.04em", lineHeight: 0.92 }}>
            <span className="block">
              {built.map((c, i) => <span key={i} className="hero-letter">{c}</span>)}
            </span>
            <span className="block text-neon">
              {different.map((c, i) => <span key={i} className="hero-letter">{c}</span>)}
            </span>
          </h1>
          <p className="hero-sub mt-8 max-w-xl text-base text-[var(--gray-light)]">
            111 Fitness Club · Tirur, Kerala — Est. 2020
          </p>
          <div className="hero-sub mt-10 flex flex-wrap gap-4">
            <div className="relative inline-flex items-center justify-center">
              {/* rotating ring centered behind the button */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 md:h-40 md:w-40">
                <svg viewBox="0 0 200 200" className="spin-ring h-full w-full">
                  <defs>
                    <path id="circle" d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
                  </defs>
                  <text fontSize="14" fill="var(--gray-light)" letterSpacing="4" fontFamily="Space Grotesk">
                    <textPath href="#circle">TIRUR · KERALA · 111 FITNESS · 4.7★ RATED · </textPath>
                  </text>
                </svg>
              </div>
              <Link to="/membership" className="btn btn-primary relative z-10">Join Now</Link>
            </div>
            <Link to="/enquiry" className="btn relative z-10">Enquire</Link>
          </div>
        </div>
      </section>

      {/* HORIZONTAL SCROLL PIN */}
      <section ref={horizontalRef} className="relative h-screen overflow-hidden bg-black border-t border-[#1E1E1E]">
        <div ref={horizontalContainerRef} className="flex h-full w-[300vw]">
          {/* Panel A */}
          <div className="h-panel flex h-full w-screen flex-col items-center justify-center px-6 text-center">
            <div className="panel-content">
              <span className="text-neon font-display font-bold leading-none" style={{ fontSize: "clamp(140px, 24vw, 360px)", letterSpacing: "-0.05em" }}>
                111
              </span>
              <p className="eyebrow mt-6 text-[var(--gray-light)]">reps · sets · days</p>
            </div>
          </div>

          {/* Panel B */}
          <div className="h-panel flex h-full w-screen flex-col items-center justify-center px-6 text-center">
            <div className="panel-content">
              <blockquote className="max-w-4xl font-display italic text-white" style={{ fontSize: "clamp(32px, 5vw, 72px)", lineHeight: 1.1 }}>
                "Good equipments. Nice ambience."
              </blockquote>
              <p className="eyebrow mt-6 text-[var(--gray-light)]">— Google Review, 2024</p>
              <div className="mt-8 flex justify-center gap-4 text-[var(--gray-light)]">
                {[0, 1, 2, 3, 4].map((i) => (
                  <StarIcon key={i} filled={i === 0} />
                ))}
              </div>
            </div>
          </div>

          {/* Panel C */}
          <div className="h-panel flex h-full w-screen flex-col items-center justify-center px-6 text-center">
            <div className="panel-content">
              <p className="max-w-3xl font-display font-bold text-white" style={{ fontSize: "clamp(32px, 5vw, 64px)", lineHeight: 1.05, letterSpacing: "-0.03em" }}>
                We don't count your calories.<br />
                We count your <span className="text-neon">comebacks.</span>
              </p>
              <Link to="/membership" className="btn btn-primary group mt-12 inline-flex items-center gap-2 font-display text-2xl font-bold uppercase text-neon hover:text-white transition-colors">
                See Plans <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHY 111 */}
      <section ref={revealRef} className="border-t border-[#1E1E1E] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="reveal font-display font-bold text-white" style={{ fontSize: "clamp(36px, 5vw, 64px)", letterSpacing: "-0.03em" }}>
            Why members stay.
          </h2>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              { title: "Serious Equipment", body: "Full free weights, machines, and cardio zone — everything you need, nothing you don't.", icon: <DumbbellIcon /> },
              { title: "Flexible Hours", body: "Open every day. Mornings 6–10 AM, evenings 5–10 PM. Train around your life.", icon: <ClockIcon /> },
              { title: "Proven Community", body: "59 members reviewed us 4.7 stars. That's not marketing — that's proof.", icon: <UsersIcon /> },
            ].map((c) => (
              <article key={c.title} className="reveal bg-surface border border-[#1E1E1E] p-8" style={{ borderRadius: 2 }}>
                <div className="text-neon">{c.icon}</div>
                <h3 className="mt-6 font-display text-xl font-bold uppercase text-white">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--gray-light)]">{c.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ReviewMarquee />

      {/* HOURS */}
      <section className="border-t border-[#1E1E1E] px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
          <div>
            <p className="eyebrow">Open Today</p>
            <p className="mt-4 font-display font-bold text-white" style={{ fontSize: "clamp(36px, 4vw, 56px)", letterSpacing: "-0.03em" }}>
              6 AM – 10 AM<br />5 PM – 10 PM
            </p>
            <p className="mt-4 text-sm text-[var(--gray-light)]">All days. Walk in any time within hours.</p>
          </div>
          <div className="bg-surface border border-[#1E1E1E] p-8" style={{ borderRadius: 2 }}>
            <p className="eyebrow mb-4">Weekly Schedule</p>
            <table className="w-full text-sm">
              <tbody>
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((d) => (
                  <tr key={d} className="border-b border-[#1E1E1E]">
                    <td className="py-3 font-display uppercase tracking-wider text-white">{d}</td>
                    <td className="py-3 text-right text-[var(--gray-light)]">6–10 AM · 5–10 PM</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="px-6 py-24" style={{ background: "var(--neon-yellow)", color: "#000" }}>
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h2 className="font-display font-bold" style={{ fontSize: "clamp(40px, 5vw, 72px)", letterSpacing: "-0.03em", lineHeight: 1 }}>
              Ready to start?
            </h2>
            <p className="mt-4 max-w-lg text-base text-black/80">
              Walk in or book a callback — we'll take it from there.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="/enquiry#callback" className="btn" style={{ borderColor: "#000", color: "#000" }}>
              Book a Callback
            </a>
            <a href="https://wa.me/919847112294" target="_blank" rel="noreferrer" className="btn btn-whatsapp">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function StarIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill={filled ? "var(--neon-yellow)" : "none"} stroke={filled ? "var(--neon-yellow)" : "currentColor"} strokeWidth="1.5">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
    </svg>
  );
}

function DumbbellIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="9" width="3" height="6" /><rect x="5" y="7" width="3" height="10" />
      <rect x="16" y="7" width="3" height="10" /><rect x="19" y="9" width="3" height="6" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 16 14" />
    </svg>
  );
}
function UsersIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
