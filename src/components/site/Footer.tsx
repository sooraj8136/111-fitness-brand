import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#1E1E1E] bg-black px-6 py-16">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
        <div>
          <h3 className="font-display text-xl font-bold uppercase tracking-tight text-white">111 Fitness Club</h3>
          <p className="mt-4 text-sm leading-relaxed text-[var(--gray-light)]">
            Near Kundanath Kadavu Bridge<br />
            Chembra, Tirur<br />
            Kerala — 676307
          </p>
          <div className="mt-6 space-y-1 text-sm text-[var(--gray)]">
            <p><span className="text-neon">Morning</span> · 6:00 AM – 10:00 AM</p>
            <p><span className="text-neon">Evening</span> · 5:00 PM – 10:00 PM</p>
          </div>
        </div>
        <div className="flex flex-col items-start gap-6 md:items-end">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {[
              { to: "/", label: "Home" },
              { to: "/membership", label: "Plans" },
              { to: "/enquiry", label: "Enquire" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="font-display text-sm uppercase tracking-wider text-white hover:text-[var(--neon-yellow)]">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4">
  <a
    href="https://wa.me/919847112294"
    target="_blank"
    rel="noreferrer"
    className="btn btn-whatsapp"
  >
    Chat on WhatsApp
  </a>

  <a
    href="https://instagram.com/YOUR_INSTAGRAM_USERNAME"
    target="_blank"
    rel="noreferrer"
    aria-label="Instagram"
    className="flex h-11 w-11 items-center justify-center rounded-full border border-[#1E1E1E] text-white transition hover:border-[var(--neon-yellow)] hover:text-[var(--neon-yellow)]"
  >
    <Instagram size={20} />
  </a>
</div>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl border-t border-[#1E1E1E] pt-6 text-xs uppercase tracking-widest text-[var(--gray)]">
        © 2025 111 Fitness Club · Tirur, Kerala
      </div>
    </footer>
  );
}