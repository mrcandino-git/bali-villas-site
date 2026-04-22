"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Villa,
  villaHeroImage,
  defaultWhatsappUrl,
  villaWhatsappUrl,
} from "@/lib/villas";
import VillaAvailability from "@/components/VillaAvailability";

const WA_ICON = (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

function openWhatsApp(url: string) {
  if (typeof window === "undefined") return;
  window.location.href = url;
}

export default function VillaPage({
  villa,
}: {
  villa: Villa;
  bookedDates?: string[];
}) {
  const heroImage = villaHeroImage(villa);
  const villaWaUrl = villaWhatsappUrl(villa);
  const genericWaUrl = defaultWhatsappUrl();

  return (
    <div className="min-h-screen bg-[#f5f0eb] text-stone-900 font-sans">
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 bg-[#f5f0eb]/90 backdrop-blur-md border-b border-stone-200/60">
        <Link
          href="/"
          className="text-sm font-semibold tracking-[0.2em] uppercase text-stone-800 hover:text-stone-500 transition-colors"
        >
          ← Bali Five Stars Villas
        </Link>

        <button
          type="button"
          onClick={() => openWhatsApp(villaWaUrl)}
          className="rounded-full bg-stone-900 px-6 py-3 text-white text-xs tracking-widest uppercase hover:bg-stone-700 transition-colors"
        >
          Enquire
        </button>
      </header>

      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center text-center pt-20 overflow-hidden">
        <Image
          src={heroImage}
          alt={villa.name}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/20 via-stone-900/35 to-stone-900/70" />

        <div className="relative z-10 px-6 max-w-4xl">
          <p className="text-xs tracking-[0.4em] uppercase text-white/70 mb-4">
            {villa.location} · Private Villa
          </p>

          <h1 className="text-5xl md:text-7xl font-light tracking-tight text-white mb-6">
            {villa.name}
          </h1>

          <p className="text-lg text-white/80 font-light max-w-lg mx-auto mb-8">
            {villa.tagline}
          </p>

          <div className="flex items-center justify-center gap-6 text-sm text-white/70 mb-10">
            <span>{villa.beds} Bedrooms</span>
            <span className="text-white/30">·</span>
            <span>{villa.baths} Bathrooms</span>
          </div>

          <button
            type="button"
            onClick={() => openWhatsApp(genericWaUrl)}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-stone-900 text-sm tracking-widest uppercase rounded-full hover:bg-stone-100 transition-colors"
          >
            {WA_ICON}
            Book Direct via WhatsApp
          </button>
        </div>
      </section>

      <section className="px-6 md:px-16 py-12 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        <div>
          <p className="text-xs tracking-[0.4em] uppercase text-stone-400 mb-6">
            About
          </p>

          <p className="text-lg text-stone-600 font-light leading-relaxed mb-10">
            {villa.description}
          </p>

          <button
            type="button"
            onClick={() => openWhatsApp(genericWaUrl)}
            className="inline-flex items-center justify-center gap-3 mt-10 px-7 py-4 bg-stone-900 text-white text-sm tracking-widest uppercase rounded-full hover:bg-stone-700 transition-colors"
          >
            {WA_ICON}
            Book Direct via WhatsApp
          </button>
        </div>

        <div>
          <p className="text-xs tracking-[0.4em] uppercase text-stone-400 mb-6">
            Features
          </p>

          <ul className="space-y-4">
            {villa.features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-3 text-stone-600 text-sm"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: villa.accentColor }}
                />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <VillaAvailability villaSlug={villa.slug} />

      <section className="bg-stone-900 text-white py-20 px-6 text-center mt-12">
        <p className="text-xs tracking-[0.4em] uppercase text-stone-400 mb-4">
          Ready to book?
        </p>

        <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4">
          Skip the fees. Book direct.
        </h2>

        <p className="text-stone-400 font-light mb-10 max-w-md mx-auto">
          Message us on WhatsApp for the best rate and a personal response within
          the hour.
        </p>

        <button
          type="button"
          onClick={() => openWhatsApp(genericWaUrl)}
          className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-stone-900 text-sm tracking-widest uppercase rounded-full font-semibold hover:bg-stone-100 transition-colors"
        >
          {WA_ICON}
          Book Direct via WhatsApp
        </button>
      </section>

      <footer className="bg-stone-900 border-t border-stone-800 py-8 px-6 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-stone-500 text-xs tracking-widest uppercase">
          <Link href="/" className="hover:text-white transition-colors">
            Bali Five Stars Villas
          </Link>

          <span>© 2026 · All rights reserved</span>

          <button
            type="button"
            onClick={() => openWhatsApp(genericWaUrl)}
            className="hover:text-white transition-colors"
          >
            +62 821-4657-4879
          </button>
        </div>
      </footer>

      <button
        type="button"
        onClick={() => openWhatsApp(villaWaUrl)}
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-lg hover:bg-[#1ebe5d] transition-colors"
      >
        {WA_ICON}
      </button>
    </div>
  );
}