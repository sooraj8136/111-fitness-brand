import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/membership")({
  head: () => ({
    meta: [
      { title: "Membership Plans | 111 Fitness Club, Tirur" },
      { name: "description", content: "Simple, transparent membership plans. Monthly to annual. Mens, Ladies, Cardio-only and Premium PT. No lock-ins, no hidden fees." },
      { property: "og:title", content: "Membership Plans | 111 Fitness Club" },
      { property: "og:description", content: "Simple. No hidden fees. No lock-ins." },
    ],
  }),
  component: Membership,
});

type Plan = {
  name: string;
  priceLines: string[];
  features: string[];
  badge?: string;
  featured?: boolean;
  ctaLabel?: string;
  ctaTo?: string;
  ctaHash?: string;
};

const plans: Plan[] = [
  {
    name: "Cardio Only",
    priceLines: ["₹500 / month", "₹1,500 / 3 months"],
    features: ["Cardio equipment access", "Locker access", "Water & towel service"],
  },
  {
    name: "Mens Membership",
    priceLines: ["₹800 / month", "₹2,000 / 3 months", "₹3,550 / 6 months", "₹5,600 / year"],
    features: ["Access to all equipment", "Free weights & machines", "Cardio zone", "Locker access"],
  },
  {
    name: "Ladies Membership",
    priceLines: ["₹1,000 / month (with cardio)", "₹2,500 / 3 months", "₹300 one-time registration"],
    features: ["Dedicated ladies zone (3–5 PM)", "All equipment access", "Cardio with training", "Locker access"],
    badge: "Popular",
    featured: true,
  },
  {
    name: "Premium Training",
    priceLines: ["Custom pricing", "1-on-1 or small group"],
    features: ["Personalized program", "Nutrition guidance", "Progress tracking", "Flexible scheduling"],
    ctaLabel: "Book a PT Session →",
    ctaTo: "/enquiry",
    ctaHash: "pt-booking",
  },
];

function Membership() {
  return (
    <>
      <section className="px-6 pt-24 pb-12">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-display font-bold text-white" style={{ fontSize: "clamp(64px, 11vw, 148px)", letterSpacing: "-0.04em", lineHeight: 0.92 }}>
            Plans.
          </h1>
          <p className="mt-6 max-w-xl text-base text-[var(--gray-light)]">
            Simple. No hidden fees. No lock-ins. Pick what fits your training.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          {plans.map((p) => (
            <article
              key={p.name}
              className="relative bg-surface p-8 md:p-10"
              style={{
                borderRadius: 2,
                border: p.featured ? "1px solid var(--neon-yellow)" : "1px solid #1E1E1E",
              }}
            >
              {p.badge && (
                <span className="absolute right-4 top-4 bg-neon px-3 py-1 font-display text-xs font-bold uppercase tracking-wider">
                  {p.badge}
                </span>
              )}
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-white">{p.name}</h2>
              <div className="mt-6 space-y-1">
                {p.priceLines.map((pl) => (
                  <p key={pl} className="font-display text-2xl font-bold text-neon">{pl}</p>
                ))}
              </div>
              <ul className="mt-8 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-[var(--gray-light)]">
                    <span className="text-neon">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to={p.ctaTo ?? "/enquiry"}
                hash={p.ctaHash}
                search={p.ctaTo ? undefined : { plan: p.name.toLowerCase().replace(/\s+/g, "-") }}
                className="btn mt-10 w-full"
              >
                {p.ctaLabel ?? "Enquire about this plan →"}
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* PT split */}
      <section className="border-t border-[#1E1E1E] px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="eyebrow">Personal Training</p>
            <h2 className="mt-4 font-display font-bold text-white" style={{ fontSize: "clamp(36px, 5vw, 64px)", letterSpacing: "-0.03em", lineHeight: 1 }}>
              Take your training seriously.
            </h2>
            <p className="mt-6 max-w-lg text-base text-[var(--gray-light)]">
              One-on-one coaching tailored to your goal. Build strength. Lose fat. Transform your body — with a coach who actually pays attention.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-[var(--gray-light)]">
              {["Personalised programming", "Form correction every session", "Progress tracking & accountability"].map((b) => (
                <li key={b} className="flex items-start gap-3"><span className="text-neon">✓</span>{b}</li>
              ))}
            </ul>
          </div>
          <div className="bg-surface border border-[#1E1E1E] p-10" style={{ borderRadius: 2 }}>
            <p className="eyebrow">Ready when you are</p>
            <h3 className="mt-4 font-display text-3xl font-bold text-white">Book a session.</h3>
            <p className="mt-4 text-sm text-[var(--gray-light)]">Tell us your goal and preferred time. We'll confirm within 24 hours.</p>
            <Link to="/enquiry" hash="pt-booking" className="btn btn-primary mt-8 w-full">Book a PT Session →</Link>
          </div>
        </div>
      </section>
    </>
  );
}