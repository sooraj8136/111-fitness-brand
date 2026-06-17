import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { ReviewMarquee } from "../components/site/ReviewMarquee";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "111 Fitness Club | Tirur, Kerala — 4.7★ Rated Gym" },
      { name: "description", content: "Serious equipment. Real results. 111 Fitness Club in Tirur is Kerala's most-reviewed neighbourhood gym. Join now or book a personal training session." },
      { property: "og:title", content: "111 Fitness Club | Tirur" },
      { property: "og:description", content: "Serious equipment. Real results. Tirur's most reviewed gym." },
    ],
  }),
  component: Home,
});

function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const manifestoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let cleanup = () => {};
    (async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      const gsap = gsapMod.default;
      const ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      // hero letters
      const letters = heroRef.current?.querySelectorAll(".hero-letter");
      if (letters?.length) {
        gsap.from(letters, { y: 80, opacity: 0, duration: 0.6, ease: "power4.out", stagger: 0.04, delay: 0.15 });
      }
      const sub = heroRef.current?.querySelector(".hero-sub");
      if (sub) gsap.from(sub, { y: 20, opacity: 0, duration: 0.6, delay: 1.0 });

      if (window.innerWidth >= 768) {
        // reveal blocks
        revealRef.current?.querySelectorAll(".reveal").forEach((el) => {
          gsap.from(el, {
            scrollTrigger: { trigger: el, start: "top 85%" },
            y: 60, opacity: 0, duration: 0.75, ease: "power3.out",
          });
        });

        // manifesto horizontal pin
        const container = manifestoRef.current;
        if (container) {
          const track = container.querySelector(".manifesto-track") as HTMLElement | null;
          if (track) {
            const distance = track.scrollWidth - window.innerWidth;
            gsap.to(track, {
              x: -distance,
              ease: "none",
              scrollTrigger: { trigger: container, pin: true, scrub: 1, end: () => `+=${distance}` },
            });
          }
        }
      }

      cleanup = () => ScrollTrigger.getAll().forEach((t) => t.kill());
    })();
    return () => cleanup();
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
            <Link to="/membership" className="btn btn-primary">Join Now</Link>
            <Link to="/enquiry" className="btn">Enquire</Link>
          </div>
        </div>

        {/* rotating ring */}
        <div className="pointer-events-none absolute bottom-8 left-6 h-32 w-32 md:h-40 md:w-40">
          <svg viewBox="0 0 200 200" className="spin-ring h-full w-full">
            <defs>
              <path id="circle" d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
            </defs>
            <text fontSize="14" fill="var(--gray-light)" letterSpacing="4" fontFamily="Space Grotesk">
              <textPath href="#circle">TIRUR · KERALA · 111 FITNESS · 4.7★ RATED · </textPath>
            </text>
          </svg>
        </div>
      </section>

      {/* MANIFESTO horizontal scroll */}
      <section ref={manifestoRef} className="relative overflow-hidden bg-black">
        <div className="manifesto-track flex" style={{ width: "300vw" }}>
          <div className="flex h-screen w-screen flex-col items-center justify-center px-8 text-center">
            <span className="text-neon font-display font-bold leading-none" style={{ fontSize: "clamp(180px, 30vw, 420px)", letterSpacing: "-0.05em" }}>
              111
            </span>
            <p className="eyebrow mt-6">reps · sets · days</p>
          </div>
          <div className="flex h-screen w-screen flex-col items-center justify-center px-8 text-center">
            <blockquote className="max-w-4xl font-display italic text-white" style={{ fontSize: "clamp(36px, 6vw, 84px)", lineHeight: 1.1 }}>
              "Good equipments. Nice ambience."
            </blockquote>
            <p className="eyebrow mt-6">— Google Review, 2024</p>
            <div className="mt-6 flex gap-2 text-2xl">
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} className="text-neon">★</span>
              ))}
            </div>
          </div>
          <div className="flex h-screen w-screen flex-col items-center justify-center px-8 text-center">
            <p className="max-w-3xl font-display font-bold text-white" style={{ fontSize: "clamp(32px, 5vw, 64px)", lineHeight: 1.05, letterSpacing: "-0.03em" }}>
              We don't count your calories.<br />
              We count your <span className="text-neon">comebacks.</span>
            </p>
            <Link to="/membership" className="btn btn-primary mt-10">See Plans →</Link>
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
                {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map((d) => (
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
