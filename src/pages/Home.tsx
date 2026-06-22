import { Link } from "react-router-dom";
import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReviewMarquee } from "../components/site/ReviewMarquee";
import heroAthlete from "@/assets/111-fitness-clubimage.png";

gsap.registerPlugin(ScrollTrigger);

export function Home() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const horizontalContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "111 Fitness Club | Tirur, Kerala — 4.7★ Rated Gym";
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const letters = heroRef.current?.querySelectorAll(".hero-letter");
      if (letters?.length) {
        gsap.from(letters, { y: 80, opacity: 0, duration: 0.6, ease: "power4.out", stagger: 0.04, delay: 0.15 });
      }
      const sub = heroRef.current?.querySelector(".hero-sub");
      if (sub) gsap.from(sub, { y: 20, opacity: 0, duration: 0.6, delay: 1.0 });

      revealRef.current?.querySelectorAll(".reveal").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 85%" },
          y: 60,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
        });
      });

      if (horizontalRef.current && horizontalContainerRef.current) {
        const tween = gsap.to(horizontalContainerRef.current, {
          x: () => -(horizontalContainerRef.current!.scrollWidth - window.innerWidth) + "px",
          ease: "none",
          scrollTrigger: {
            trigger: horizontalRef.current,
            pin: true,
            pinReparent: false,
            scrub: 1,
            end: () => "+=" + horizontalContainerRef.current!.offsetWidth,
            invalidateOnRefresh: true,
          },
        });

        const panels = gsap.utils.toArray<HTMLElement>(".h-panel", horizontalContainerRef.current);
        panels.forEach((panel) => {
          gsap.from(panel.querySelectorAll(".panel-accent-line"), {
            scaleX: 0,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: "left 92%",
              end: "left 55%",
              scrub: true,
            },
          });

          gsap.from(panel.querySelectorAll(".panel-corner"), {
            scale: 0,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.06,
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: "left 90%",
              end: "left 58%",
              scrub: true,
            },
          });

          panel.querySelectorAll(".panel-text-line").forEach((line, lineIndex) => {
            gsap.from(line, {
              y: 80,
              opacity: 0,
              duration: 1,
              ease: "power4.out",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tween,
                start: `left ${88 - lineIndex * 4}%`,
                end: "left 48%",
                scrub: true,
              },
            });
          });

          const content = panel.querySelector(".panel-content");
          if (content) {
            gsap.from(content.querySelectorAll(".panel-sub"), {
              opacity: 0,
              y: 30,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tween,
                start: "left 75%",
                end: "left 40%",
                scrub: true,
              },
            });
          }
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  const built = "BUILT".split("");
  const different = "DIFFERENT.".split("");

  return (
    <div ref={rootRef}>
      {/* HERO */}
      <section ref={heroRef} className="hero-section relative flex min-h-[92vh] items-center overflow-hidden px-6">
        <div className="hero-club-visual" aria-hidden="true">
          <img
            src={heroAthlete}
            alt=""
            className="hero-club-visual__img"
            loading="eager"
            decoding="async"
            style={{ opacity: 0.75 }}
          />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <p className="hero-sub mb-6 text-sm uppercase tracking-[0.22em] text-[var(--gray-light)]">
            DON'T DREAM IT , DO IT ! SET YOUR BODY YOUR OWN AMBITION
          </p>
          <h1
            className="font-display font-bold text-white"
            style={{
              fontSize: "clamp(64px, 11vw, 148px)",
              letterSpacing: "-0.04em",
              lineHeight: 0.92,
            }}
          >
            <span className="block">
              {built.map((c, i) => (
                <span key={i} className="hero-letter">
                  {c}
                </span>
              ))}
            </span>

            <span
              className="block text-neon"
              style={{ fontSize: "0.85em" }} // decrease DIFFERENT size
            >
              {different.map((c, i) => (
                <span key={i} className="hero-letter">
                  {c}
                </span>
              ))}
            </span>
          </h1>
          <p className="hero-sub mt-8 max-w-xl text-base text-[var(--gray-light)]">
            111 Fitness Club · Tirur, Kerala — Est. 2020
          </p>
          <div className="hero-sub mt-10 flex flex-wrap gap-4">
            <div className="relative inline-flex items-center justify-center">
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 md:h-40 md:w-40">
                <svg viewBox="0 0 200 200" className="spin-ring h-full w-full">
                  <defs>
                    <path id="circle" d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
                  </defs>
                  <text fontSize="14" fill="var(--gray-light)" letterSpacing="4" fontFamily="Space Grotesk">
                    {/* <textPath href="#circle">TIRUR · KERALA · 111 FITNESS · 4.7★ RATED · </textPath> */}
                  </text>
                </svg>
              </div>
              <Link to="/membership" className="btn btn-primary relative z-10">Join Now</Link>
            </div>
            <Link to="/enquiry" className="btn relative z-10" style={{ backgroundColor: "#000", color: "#fff" }}>Enquire</Link>
          </div>
        </div>
      </section>

      {/* HORIZONTAL SCROLL PIN */}
      <section
        ref={horizontalRef}
        className="relative h-screen overflow-hidden bg-black border-t border-[#1E1E1E]"
      >
        <div
          ref={horizontalContainerRef}
          className="flex h-full w-[300vw]"
        >
          {/* PANEL 1 */}
          <div className="h-panel relative flex h-full w-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000&auto=format&fit=crop')",
              }}
            />

            <div className="absolute inset-0 bg-black/60" />

            <div className="panel-content relative z-10">
              <span
                className="text-neon font-display font-bold leading-none"
                style={{
                  fontSize: "clamp(180px, 30vw, 520px)",
                  letterSpacing: "-0.08em",
                }}
              >
                111
              </span>

              <p className="mt-6 whitespace-nowrap text-sm uppercase tracking-[0.22em] text-[var(--gray-light)] md:text-xl md:tracking-[0.4em]">
                reps · sets · days
              </p>
            </div>
          </div>

          {/* PANEL 2 */}
          <div className="h-panel relative flex h-full w-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2000&auto=format&fit=crop')",
              }}
            />

            <div className="absolute inset-0 bg-black/65" />

            <div className="panel-content relative z-10">
              <blockquote
                className="max-w-5xl font-display font-bold italic text-white"
                style={{
                  fontSize: "clamp(48px, 8vw, 120px)",
                  lineHeight: 1,
                }}
              >
                "DON'T DREAM IT,
                <br />
                DO IT!"
              </blockquote>

              {/* <div className="mt-10 flex justify-center gap-4 text-[var(--gray-light)]">
          {[0, 1, 2, 3, 4].map((i) => (
            <StarIcon key={i} filled />
          ))}
        </div> */}
            </div>
          </div>

          {/* PANEL 3 */}
          <div className="h-panel relative flex h-full w-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=2000&auto=format&fit=crop')",
              }}
            />

            <div className="absolute inset-0 bg-black/65" />

            <div className="panel-content relative z-10">
              <p
                className="max-w-5xl font-display font-bold text-white"
                style={{
                  fontSize: "clamp(50px, 8vw, 110px)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.04em",
                }}
              >
                SET YOUR BODY
                <br />
                YOUR OWN AMBITION
              </p>

              <Link
                to="/membership"
                className="group mt-8 inline-flex items-center gap-2 border border-[#fbff00] px-6 py-3 font-display text-base font-bold uppercase text-neon transition-all duration-300 hover:bg-[var(--neon-yellow)] hover:text-black hover:border-[var(--neon-yellow)] md:mt-12 md:gap-3 md:px-10 md:py-5 md:text-3xl"
              >
                <span className="group-hover:text-black">See Plans</span>
                <span className="transition-transform duration-300 group-hover:translate-x-2 group-hover:text-black">
                  →
                </span>
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

      {/* MEMBER TESTIMONIALS */}
      <section className="border-t border-[#1E1E1E] px-6 py-24" style={{ background: "#080808" }}>
        <div className="mx-auto max-w-7xl">

          {/* Header */}
          <p className="eyebrow mb-4" style={{ color: "var(--neon-yellow)" }}>What Members Say</p>
          <h2
            className="font-display font-bold text-white"
            style={{ fontSize: "clamp(36px, 6vw, 72px)", letterSpacing: "-0.04em", lineHeight: 1.0 }}
          >
            REAL RESULTS.
            <br />
            <span style={{ color: "var(--neon-yellow)" }}>REAL PEOPLE.</span>
          </h2>
          <p className="mt-3 text-sm text-[var(--gray-light)]">111 Fitness Club · Tirur, Kerala — Est. 2020</p>

          {/* Rating bar */}
          <div className="mt-10 flex flex-wrap items-center gap-6 border-b border-[#1E1E1E] pb-8">
            <div className="flex items-center gap-4">
              <span
                className="font-display font-bold text-white"
                style={{ fontSize: "clamp(48px, 7vw, 72px)", letterSpacing: "-0.04em", lineHeight: 1 }}
              >
                4.7
              </span>
              <div>
                <div className="flex gap-0.5 mb-1">
                  {/* 4 full stars */}
                  {[0, 1, 2, 3].map((i) => (
                    <svg
                      key={i}
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="var(--neon-yellow)"
                      stroke="none"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
                    </svg>
                  ))}

                  {/* Half star */}
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <defs>
                      <linearGradient id="half-star">
                        <stop offset="50%" stopColor="var(--neon-yellow)" />
                        <stop offset="50%" stopColor="#444" />
                      </linearGradient>
                    </defs>
                    <polygon
                      points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"
                      fill="url(#half-star)"
                    />
                  </svg>
                </div>
                <p className="text-xs text-[var(--gray-light)] tracking-wider">Based on 120+ reviews</p>
              </div>
            </div>
            <a
              href="https://g.co/kgs/111fitness"
              target="_blank"
              rel="noreferrer"
              className="ml-auto flex items-center gap-2 rounded border border-[#2a2a2a] bg-[#111] px-4 py-2 text-sm font-display font-semibold text-white transition-colors hover:border-[var(--neon-yellow)] hover:text-[var(--neon-yellow)]"
              style={{ borderRadius: 4 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google Reviews
            </a>
          </div>

          {/* Review cards grid */}
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                top: true,
                stars: 5,
                text: "Its very good fitness club, good ambience. A/C available in this fitness club and this is clean and best. All gym equipment available here. Vehicle parking available here. Almost good 👍🏻",
                name: "fakemyme ϟ",
                initials: "FM",
                avatarBg: "#1a2e00",
                avatarColor: "var(--neon-yellow)",
                since: "2022",
                // tag: "Local Guide · 11 reviews",
              },
              {
                stars: 5,
                text: "A/c gym good trainers and hygiene gym",
                name: "Sinan Sinu",
                initials: "SS",
                avatarBg: "#0d1f2a",
                avatarColor: "#7ec8e3",
                since: "2024",
                // tag: "2 reviews",
              },
              {
                stars: 5,
                text: "Pretty good. Good equipments. Nice ambience.",
                name: "SHAMMAS",
                initials: "SH",
                avatarBg: "#1a1200",
                avatarColor: "#ffd966",
                since: "2021",
                // tag: "5 reviews",
              },
              {
                stars: 5,
                text: "Vere level... morning gym 🔥",
                name: "Hari Sree",
                initials: "HS",
                avatarBg: "#1a002a",
                avatarColor: "#cc99ff",
                since: "2022",
                // tag: "2 reviews · 2 photos",
              },
              {
                stars: 5,
                text: "I really enjoy 111 fitness club. Good experience 👍👍👍👍👍👍",
                name: "Safuvan Sha",
                initials: "SV",
                avatarBg: "#001a1a",
                avatarColor: "#66ffcc",
                since: "2020",
                // tag: "1 review",
              },
              {
                stars: 5,
                text: "Good gym and good trainers.",
                name: "Mohammed Liyan",
                initials: "ML",
                avatarBg: "#1a0a00",
                avatarColor: "#ff9966",
                since: "2024",
                // tag: "2 reviews",
              },
            ].map((r, idx) => (
              <div
                key={idx}
                style={{
                  background: r.top ? "transparent" : "#111111",
                  border: r.top ? "1.5px solid var(--neon-yellow)" : "1px solid #1E1E1E",
                  borderRadius: 4,
                  padding: "24px",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                {r.top && (
                  <span
                    style={{
                      position: "absolute",
                      top: -13,
                      left: 20,
                      background: "var(--neon-yellow)",
                      color: "#000",
                      fontSize: 10,
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      padding: "2px 10px",
                      borderRadius: 2,
                    }}
                  >
                    Top Review
                  </span>
                )}

                {/* Stars */}
                <div className="flex gap-0.5">
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="var(--neon-yellow)" stroke="none">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 14,
                    lineHeight: 1.65,
                    color: "#e0e0e0",
                    flexGrow: 1,
                  }}
                >
                  <span style={{ color: "var(--neon-yellow)", fontWeight: 700, fontSize: 18, lineHeight: 1 }}>"</span>{r.text}<span style={{ color: "var(--neon-yellow)", fontWeight: 700, fontSize: 18, lineHeight: 1 }}>"</span>
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 border-t border-[#1E1E1E] pt-4">
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: r.avatarBg,
                      color: r.avatarColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      letterSpacing: "0.04em",
                      flexShrink: 0,
                      border: `1px solid ${r.avatarColor}33`,
                    }}
                  >
                    {r.initials}
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 700, color: "#fff" }}>{r.name}</p>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--gray)", letterSpacing: "0.06em" }}>
                      Member since {r.since}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom join strip */}
          <div
            className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded px-6 py-5"
            style={{ background: "#111111", border: "1px solid #1E1E1E", borderRadius: 4 }}
          >
            <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#ccc" }}>
              Join <span style={{ color: "#fff", fontWeight: 700 }}>500+ members</span> who already train at 111 Fitness Club.
            </p>
            <Link
              to="/membership"
              className="flex items-center gap-2 font-display font-bold uppercase"
              style={{
                background: "var(--neon-yellow)",
                color: "#000",
                padding: "10px 22px",
                borderRadius: 2,
                fontSize: 13,
                letterSpacing: "0.08em",
                whiteSpace: "nowrap",
              }}
            >
              Join Now
              <span style={{ fontSize: 16 }}>↗</span>
            </Link>
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
            <Link to="/enquiry#callback" className="btn" style={{ borderColor: "#000", color: "#000" }}>
              Book a Callback
            </Link>
            <a href="https://wa.me/919847112294" target="_blank" rel="noreferrer" className="btn btn-whatsapp">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
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
