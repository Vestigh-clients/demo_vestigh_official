import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/category/hair-care", label: "Hair Care" },
  { to: "/category/mens-fashion", label: "Men" },
  { to: "/category/womens-fashion", label: "Women" },
  { to: "/category/bags", label: "Bags" },
  { to: "/category/shoes", label: "Shoes" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const overlayHero = isHome && !scrolled && !open;

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 28);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  return (
    <nav
      className={`top-0 left-0 z-50 w-full transition-[background-color,border-color,backdrop-filter] duration-500 ${
        isHome
          ? overlayHero
            ? "absolute bg-transparent border-transparent"
            : "fixed bg-black/55 backdrop-blur-md border-b border-white/15"
          : "sticky bg-background/95 backdrop-blur-md border-b border-border"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-5 px-4">
        <Link
          to="/"
          className={`font-display text-2xl font-bold tracking-wider transition-colors ${
            isHome ? "text-white" : "text-primary"
          }`}
        >
          LUXURIANT
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center">
          {navLinks.map((link, index) => (
            <div key={link.to} className="flex items-center">
              <Link
                to={link.to}
                className={`font-body text-[11px] uppercase tracking-[0.1em] transition-colors hover:text-accent ${
                  location.pathname === link.to
                    ? "text-accent font-semibold"
                    : isHome
                      ? "text-white/85"
                      : "text-foreground/70"
                }`}
              >
                {link.label}
              </Link>
              {index < navLinks.length - 1 && (
                <span className="mx-4 text-[#d4ccc2]" aria-hidden="true">
                  |
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Mobile toggle */}
        <button className={`lg:hidden ${isHome ? "text-white" : "text-foreground"}`} onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className={`lg:hidden px-4 pb-4 animate-fade-in ${
            isHome
              ? "bg-black/60 backdrop-blur-md border-b border-white/15"
              : "bg-background/95 backdrop-blur-md border-b border-border"
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`block py-2.5 font-body text-[11px] uppercase tracking-[0.1em] transition-colors hover:text-accent ${
                location.pathname === link.to
                  ? "text-accent font-semibold"
                  : isHome
                    ? "text-white/85"
                    : "text-foreground/70"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
