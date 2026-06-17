import { Link } from "@tanstack/react-router";
import { useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/membership", label: "Plans" },
  { to: "/enquiry", label: "Enquire" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navigation() {
  const [open, setOpen] = useState(false);
  return (
    <header
      className="fixed top-0 left-0 right-0 z-40"
      style={{ background: "rgba(10,10,10,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid #1E1E1E" }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-baseline gap-3" onClick={() => setOpen(false)}>
          <span className="font-display text-3xl font-bold leading-none tracking-tighter" style={{ borderBottom: "2px solid var(--neon-yellow)", paddingBottom: 2 }}>
            111
          </span>
          <span className="eyebrow hidden sm:inline">Fitness Club</span>
        </Link>

        <button
          aria-label="Toggle menu"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block h-px w-6 bg-white" />
          <span className="block h-px w-6 bg-white" />
          <span className="block h-px w-6 bg-white" />
        </button>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeProps={{ style: { color: "var(--neon-yellow)" } }}
                className="font-display text-sm uppercase tracking-wider text-white transition-colors hover:text-[var(--neon-yellow)]"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {open && (
        <div className="fixed inset-0 top-[64px] z-30 flex flex-col items-center justify-center gap-8 bg-black md:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="font-display text-3xl uppercase tracking-tight text-white"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}