import { useI18n } from "@/lib/i18n";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "@/assets/logo.svg";

const NAV_ITEMS = [
  { to: "/about", key: "nav.about" },
  { to: "/services", key: "nav.services" },
  { to: "/sectors", key: "nav.sectors" },
  { to: "/projects", key: "nav.projects" },
  { to: "/standards", key: "nav.standards" },
  { to: "/contact", key: "nav.contact" },
] as const;

export function Header() {
  const { lang, setLang, t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-background/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="relative flex items-center justify-between h-20 sm:h-24">
          {/* Brand */}
          <Link to="/" className="flex items-center relative z-10" aria-label="IndustryArch">
            <img src={logo} alt="IndustryArch" className="h-16 sm:h-20 w-auto" />
          </Link>

          {/* Desktop nav - centered */}
          <nav className="hidden lg:flex items-center gap-7 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-[12px] font-medium transition-colors tracking-wide uppercase ${
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`
                }
              >
                {t(item.key)}
              </NavLink>
            ))}
          </nav>

          {/* Desktop language switcher - right */}
          <div className="hidden lg:flex items-center border border-border rounded-md overflow-hidden relative z-10">
            {(["en", "pl", "tr"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-1 text-xs font-semibold transition-all ${
                  lang === l
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground bg-transparent"
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Mobile controls */}
          <div className="lg:hidden flex items-center gap-3">
            <div className="flex items-center border border-border rounded-md overflow-hidden">
              {(["en", "pl", "tr"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-1 text-xs font-semibold transition-all ${
                    lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <button
              className="text-foreground p-1.5"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-background border-t border-border">
          <nav className="flex flex-col px-5 py-5 gap-4">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors text-left uppercase tracking-wide ${
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`
                }
              >
                {t(item.key)}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
