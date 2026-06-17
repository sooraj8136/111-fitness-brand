import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import logoAsset from "@/assets/logo-111.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/membership", label: "Plans" },
  { to: "/enquiry", label: "Enquire" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navigation() {
  const [open, setOpen] = useState(false);

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40"
        style={{ background: "rgba(10,10,10,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid #1E1E1E" }}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <img
              src={logoAsset}
              alt="111 Fitness Club logo"
              className="h-10 w-auto md:h-12"
              loading="eager"
              decoding="async"
            />
            <span className="eyebrow hidden sm:inline">Fitness Club</span>
          </Link>

          <button
            aria-label="Toggle menu"
            className="relative flex h-10 w-10 flex-col items-center justify-center md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`absolute block h-px w-6 bg-white transition-all duration-300 ease-in-out ${open ? 'rotate-45' : '-translate-y-2'}`} />
            <span className={`absolute block h-px w-6 bg-white transition-all duration-300 ease-in-out ${open ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`absolute block h-px w-6 bg-white transition-all duration-300 ease-in-out ${open ? '-rotate-45' : 'translate-y-2'}`} />
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
      </header>

      {open && (
        <div className="fixed inset-0 z-30 overflow-y-auto bg-black pt-[73px] md:hidden">
          <div className="flex flex-col items-center gap-10 py-12">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="font-display text-4xl uppercase tracking-tight text-white transition-colors hover:text-[var(--neon-yellow)]"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}