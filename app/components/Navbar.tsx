"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const WA_NAV =
  "https://api.whatsapp.com/send?phone=6282146574879&text=Hi%2C%20I%E2%80%99d%20like%20to%20enquire%20about%20a%20villa.";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 h-[68px] transition-all duration-500 ${
        scrolled
          ? "bg-white-warm/95 backdrop-blur-sm shadow-[0_1px_0_rgba(26,22,18,0.08)]"
          : "bg-transparent"
      }`}
    >
      <Link
        href="/"
        className={`font-serif text-[13px] uppercase tracking-[0.20em] transition-colors duration-300 ${
          scrolled ? "text-off-black" : "text-white-warm"
        }`}
      >
        Bali Five Stars Villas
      </Link>

      <div className="flex items-center gap-6 md:gap-8">
        <Link
          href="/villas"
          className={`hidden md:block font-sans text-[11px] uppercase tracking-[0.14em] transition-colors duration-300 ${
            scrolled
              ? "text-off-black/60 hover:text-off-black"
              : "text-white-warm/60 hover:text-white-warm"
          }`}
        >
          Villas
        </Link>
        <Link
          href="/contact"
          className={`hidden md:block font-sans text-[11px] uppercase tracking-[0.14em] transition-colors duration-300 ${
            scrolled
              ? "text-off-black/60 hover:text-off-black"
              : "text-white-warm/60 hover:text-white-warm"
          }`}
        >
          Contact
        </Link>
        <a
          href={WA_NAV}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-beige text-off-black font-sans text-[11px] uppercase tracking-[0.10em] px-4 py-2.5 rounded-full transition-colors duration-300 hover:bg-warm-tan"
        >
          <span className="hidden md:inline">WhatsApp</span>
          <span className="md:hidden">WA</span>
        </a>
      </div>
    </nav>
  );
}
