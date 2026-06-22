
import { useEffect, useState, type FormEvent } from "react";
import { useLocation } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

export function Enquiry() {
  const [toast, setToast] = useState<string | null>(null);
  const { hash } = useLocation();

  useEffect(() => {
    document.title = "Enquire | 111 Fitness Club, Tirur";
  }, []);

  useEffect(() => {
    if (!hash) return;
    const el = document.querySelector(hash);
    el?.scrollIntoView({ behavior: "smooth" });
  }, [hash]);

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 4000);
  };

  const submit = (label: string) => (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    (e.currentTarget as HTMLFormElement).reset();
    showToast(label);
  };

  return (
    <>
      {toast && (
        <div className="fixed left-1/2 top-20 z-50 -translate-x-1/2 bg-neon px-6 py-3 font-display text-sm font-semibold uppercase tracking-wider shadow-lg">
          ✓ {toast}
        </div>
      )}

      <section className="px-6 pt-24 pb-12">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">Enquire</p>

          <h1
            className="mt-4 font-display font-bold text-white"
            style={{
              fontSize: "clamp(64px, 11vw, 148px)",
              letterSpacing: "-0.04em",
              lineHeight: 0.92,
            }}
          >
            Talk to us.
          </h1>

          <p className="mt-10 max-w-xl text-base text-[var(--gray-light)]">
            Three ways to reach the gym. Book a personal training session,
            request a callback, or message us directly on WhatsApp.
          </p>
        </div>
      </section>

      {/* PT BOOKING */}
      <section id="pt-booking" className="border-t border-[#1E1E1E] px-6 py-20" style={{ scrollMarginTop: 80 }}>
        <div className="mx-auto max-w-4xl">
          <p className="eyebrow">Section A</p>
          <h2 className="mt-3 font-display font-bold text-white" style={{ fontSize: "clamp(32px, 4vw, 56px)", letterSpacing: "-0.03em", lineHeight: 1 }}>
            Book a personal training session.
          </h2>
          <form onSubmit={submit("We'll confirm your session via WhatsApp or call within 24 hours.")} className="mt-12 grid gap-6 md:grid-cols-2">
            <Field label="Full name"><input required className="input" name="name" placeholder="Your name" /></Field>
            <Field label="Phone number"><input required type="tel" className="input" name="phone" placeholder="98XXXX XXXX" /></Field>
            <Field label="Preferred date"><input required type="date" className="input" name="date" /></Field>
            <Field label="Preferred time slot">
              <select required className="select" name="slot" defaultValue="">
                <option value="" disabled>Select a slot</option>
                <option>Morning (6:00 AM – 12:00 PM)</option>
                <option>Afternoon (12:00 PM – 5:00 PM)</option>
                <option>Evening (5:00 PM – 10:00 PM)</option>
              </select>
            </Field>
            <Field label="Fitness goal" className="md:col-span-2">
              <select required className="select" name="goal" defaultValue="">
                <option value="" disabled>Select a goal</option>
                <option>Weight Loss</option>
                <option>Muscle Gain</option>
                <option>General Fitness</option>
                <option>Rehabilitation / Recovery</option>
                <option>Sports Performance</option>
                <option>Other</option>
              </select>
            </Field>
            <Field label="Message (optional)" className="md:col-span-2">
              <textarea className="textarea" name="message" placeholder="Anything specific we should know?" />
            </Field>
            <div className="md:col-span-2">
              <button type="submit" className="btn btn-primary w-full md:w-auto">Send Booking Request</button>
            </div>
          </form>

          <div className="mt-12 flex flex-col items-start gap-4 border-t border-[#1E1E1E] pt-8 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-[var(--gray-light)]">Prefer to chat directly?</p>
            <a className="btn btn-whatsapp" target="_blank" rel="noreferrer"
              href="https://wa.me/919847112294?text=Hi%2C%20I%27d%20like%20to%20book%20a%20personal%20training%20session%20at%20111%20Fitness%20Club.">
              Start WhatsApp Chat
            </a>
          </div>
        </div>
      </section>

      {/* CALLBACK */}
      <section id="callback" className="border-t border-[#1E1E1E] bg-surface px-6 py-20" style={{ scrollMarginTop: 80 }}>
        <div className="mx-auto max-w-4xl">
          <p className="eyebrow">Section B</p>
          <h2 className="mt-3 font-display font-bold text-white" style={{ fontSize: "clamp(32px, 4vw, 56px)", letterSpacing: "-0.03em", lineHeight: 1 }}>
            We'll call you back.
          </h2>
          <form onSubmit={submit("Thanks — we'll call you at the time you picked.")} className="mt-12 grid gap-6 md:grid-cols-2">
            <Field label="Full name"><input required className="input" name="name" /></Field>
            <Field label="Phone number"><input required type="tel" className="input" name="phone" placeholder="98XXXX XXXX" /></Field>
            <Field label="Best time to call">
              <select required className="select" defaultValue="">
                <option value="" disabled>Pick a time</option>
                <option>Morning (9 AM – 12 PM)</option>
                <option>Afternoon (12 PM – 5 PM)</option>
                <option>Evening (5 PM – 9 PM)</option>
              </select>
            </Field>
            <Field label="What's it about?">
              <select required className="select" defaultValue="">
                <option value="" disabled>Pick a topic</option>
                <option>Membership Inquiry</option>
                <option>Personal Training</option>
                <option>General Information</option>
                <option>Other</option>
              </select>
            </Field>
            <div className="md:col-span-2">
              <button type="submit" className="btn btn-primary w-full md:w-auto">Request a Callback</button>
            </div>
          </form>
        </div>
      </section>

      {/* QUICK CONTACT */}
      <section className="border-t border-[#1E1E1E] px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          <a href="https://wa.me/919847112294" target="_blank" rel="noreferrer"
            className="group bg-surface border border-[#1E1E1E] p-10 transition-colors hover:border-[var(--neon-yellow)]"
            style={{ borderRadius: 2 }}>
            <FaWhatsapp size={40} color="#25D366" />
            <h3 className="mt-6 font-display text-2xl font-bold text-white">Chat on WhatsApp</h3>
            <p className="mt-2 text-sm text-[var(--gray-light)]">Usually replies within an hour.</p>
          </a>
          <a href="tel:+919847112294"
            className="bg-surface border border-[#1E1E1E] p-10 transition-colors hover:border-[var(--neon-yellow)]"
            style={{ borderRadius: 2 }}>
            <div className="text-neon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <h3 className="mt-6 font-display text-2xl font-bold text-white">Call the gym</h3>
            <p className="mt-2 text-sm text-[var(--gray-light)]">+91 98471 12294</p>
          </a>
        </div>
      </section>
    </>
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="field-label">{label}</span>
      {children}
    </label>
  );
}