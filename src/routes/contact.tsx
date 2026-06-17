import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ReviewMarquee } from "../components/site/ReviewMarquee";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Visit Us | 111 Fitness Club, Tirur" },
      { name: "description", content: "Find 111 Fitness Club near Kundanath Kadavu Bridge, Chembra, Tirur, Kerala. Open daily 6–10 AM and 5–10 PM. Call +91 98471 12294." },
      { property: "og:title", content: "Visit 111 Fitness Club, Tirur" },
      { property: "og:description", content: "Near Kundanath Kadavu Bridge, Chembra, Tirur. Open daily." },
    ],
  }),
  component: Contact,
});

const ADDRESS = `111 Fitness Club
Near Kundanath Kadavu Bridge
Chembra, Tirur
Kerala — 676307`;

function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(ADDRESS);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <>
      <section className="px-6 pt-24 pb-12">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">Visit</p>
          <h1 className="mt-4 font-display font-bold text-white" style={{ fontSize: "clamp(64px, 11vw, 148px)", letterSpacing: "-0.04em", lineHeight: 0.92 }}>
            Find us.
          </h1>
          <div className="mt-10 space-y-2 font-display text-xl font-semibold uppercase tracking-tight text-white">
            <p>111 FITNESS CLUB</p>
            <p className="text-[var(--gray-light)]">Near Kundanath Kadavu Bridge</p>
            <p className="text-[var(--gray-light)]">Chembra, Tirur</p>
            <p className="text-[var(--gray-light)]">Kerala — 676307</p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <div className="border border-[#1E1E1E]" style={{ borderRadius: 2, minHeight: 480 }}>
            <iframe
              src="https://maps.google.com/maps?q=111+fitness+club+tirur&output=embed"
              className="h-full w-full"
              style={{ border: 0, minHeight: 480, filter: "grayscale(0.6) contrast(1.1)" }}
              loading="lazy"
              title="111 Fitness Club location"
            />
          </div>
          <div className="grid gap-6">
            <div className="bg-surface border border-[#1E1E1E] p-8" style={{ borderRadius: 2 }}>
              <p className="eyebrow">Opening Hours</p>
              <p className="mt-4 font-display text-2xl font-bold text-white">Monday – Sunday</p>
              <div className="mt-4 space-y-1 text-sm text-[var(--gray-light)]">
                <p><span className="text-neon">Morning</span> · 6:00 AM – 10:00 AM</p>
                <p><span className="text-neon">Evening</span> · 5:00 PM – 10:00 PM</p>
              </div>
            </div>

            <div className="relative bg-surface border border-[#1E1E1E] p-8" style={{ borderRadius: 2 }}>
              <p className="eyebrow">Address</p>
              <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-[var(--gray-light)]">{ADDRESS}</p>
              <button onClick={copy} aria-label="Copy address" className="absolute right-4 top-4 flex items-center gap-2 border border-[#1E1E1E] px-3 py-2 text-xs uppercase tracking-wider text-[var(--gray-light)] hover:border-[var(--neon-yellow)] hover:text-[var(--neon-yellow)]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="1" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            <div className="bg-surface border border-[#1E1E1E] p-8 flex flex-col gap-3" style={{ borderRadius: 2 }}>
              <a className="btn" target="_blank" rel="noreferrer" href="https://maps.google.com/maps?q=111+fitness+club+tirur">
                Get Directions →
              </a>
              <a className="btn btn-whatsapp" target="_blank" rel="noreferrer" href="https://wa.me/919847112294">
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-3xl text-center">
          <p className="eyebrow">Direct lines</p>
          <div className="mt-4 space-y-2 text-base text-[var(--gray-light)]">
            <p>Call us: <a href="tel:+919847112294" className="text-white hover:text-[var(--neon-yellow)]">+91 98471 12294</a></p>
            <p>WhatsApp: <a href="https://wa.me/919847112294" className="text-white hover:text-[var(--neon-yellow)]">+91 98471 12294</a></p>
            <p>Email: <a href="mailto:fitnessclubtirur@gmail.com" className="text-white hover:text-[var(--neon-yellow)]">fitnessclubtirur@gmail.com</a></p>
          </div>
        </div>
      </section>

      <ReviewMarquee />
    </>
  );
}