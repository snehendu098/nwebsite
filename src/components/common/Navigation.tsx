import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MagneticButton } from "@/components/ui";
import { navItems } from "@/data/data";

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          <span className="logo-symbol">∞</span>
          <span className="logo-text">Infinititech</span>
        </Link>

        <div className={`nav-links ${mobileOpen ? "open" : ""}`}>
          {navItems.map((item, i) => (
            <Link
              key={i}
              to={item.href}
              className={`nav-link ${location.pathname === item.href ? "active" : ""}`}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <MagneticButton href="/contact" className="nav-cta">
          Let's Talk
        </MagneticButton>

        <button
          className={`nav-mobile-toggle ${mobileOpen ? "open" : ""}`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
};
