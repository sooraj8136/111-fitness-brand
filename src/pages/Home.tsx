import { Link } from "react-router-dom";
import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReviewMarquee } from "../components/site/ReviewMarquee";

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

        <p className="mt-6 text-xl uppercase tracking-[0.4em] text-[var(--gray-light)]">
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
          className="group mt-12 inline-flex items-center gap-3 border border-[#fbff00] px-10 py-5 font-display text-3xl font-bold uppercase text-neon transition-all duration-300 hover:bg-[#000000] hover:text-black"
        >
          See Plans
          <span className="transition-transform duration-300 group-hover:translate-x-2">
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
