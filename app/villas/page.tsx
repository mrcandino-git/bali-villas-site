import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import ScrollReveal from "@/app/components/ScrollReveal";
import { villas, WHATSAPP_URL, villaHeroImage, villaWhatsappUrl } from "@/lib/villas";

export const metadata = {
  title: "Our Villas — Bali Five Stars Villas",
  description:
    "Five exceptional private villas in Seminyak, Petitenget, and Canggu. Book directly via WhatsApp.",
};

export default function VillasPage() {
  return (
    <>
      <Navbar />

      <main className="overflow-x-hidden">

        {/* ─── PAGE HERO ────────────────────────────────────────── */}
        <section className="relative h-[55vh] min-h-[380px] overflow-hidden">
  <Image
    src="/villas/villa-vittoria/hero.jpg"
    alt="Our Villas"
    fill
    priority
    className="object-cover"
  />
  <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/58" />

  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pt-16">
    <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-white/70 mb-5">
      Seminyak · Petitenget · Canggu
    </p>
    <h1 className="font-serif font-light italic text-white text-[42px] sm:text-[56px] md:text-[68px] leading-[1.05]">
      Our Villas
    </h1>
    <p className="font-sans font-light text-[13px] text-white/80 mt-4">
      Five private villas. Direct booking.
    </p>
  </div>
</section>
        {/* ─── INTRO ────────────────────────────────────────────── */}
        <section className="bg-cream py-20 md:py-28">
          <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <ScrollReveal>
                <p className="font-serif italic text-[20px] md:text-[26px] text-soft-brown leading-[1.5] max-w-[560px]">
                  Each villa is private, curated, and designed for the kind of
                  stay you&apos;ll talk about for years.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={120}>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[11px] uppercase tracking-[0.14em] text-soft-brown border-b border-soft-brown pb-px hover:text-off-black hover:border-off-black transition-colors duration-300 whitespace-nowrap"
                >
                  Not sure? Ask us →
                </a>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ─── VILLA LIST ───────────────────────────────────────── */}
        <section className="bg-cream pb-24 md:pb-40">
          <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">

            {villas.map((villa, i) => {
              const isEven = i % 2 === 0;
              const image = villaHeroImage(villa);
              const waUrl = villaWhatsappUrl(villa);
              const detailUrl = `/villas/villa-${villa.slug}`;

              return (
                <div key={villa.slug}>
                  {i > 0 && <div className="w-full h-px bg-beige my-16 md:my-20" />}

                  <ScrollReveal>
                    <div
                      className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center ${
                        !isEven ? "md:[&>*:first-child]:order-2" : ""
                      }`}
                    >
                      {/* Image */}
                      <Link href={detailUrl} className="group block">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={image}
                            alt={villa.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                      </Link>

                      {/* Details */}
                      <div className="py-2">
                        <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-warm-tan mb-4">
                          {villa.location}
                        </p>
                        <Link href={detailUrl}>
                          <h2 className="font-serif font-light text-[32px] md:text-[40px] text-off-black leading-tight hover:text-soft-brown transition-colors duration-200">
                            {villa.name}
                          </h2>
                        </Link>
                        <p className="font-serif italic text-[17px] md:text-[19px] text-soft-brown leading-[1.55] mt-4">
                          {villa.tagline}
                        </p>

                        <div className="flex items-center gap-6 mt-6">
                          <span className="font-sans text-[11px] uppercase tracking-[0.14em] text-warm-tan">
                            {villa.beds} Bedrooms
                          </span>
                          <span className="text-beige">·</span>
                          <span className="font-sans text-[11px] uppercase tracking-[0.14em] text-warm-tan">
                            Private Pool
                          </span>
                        </div>

                        <div className="mt-8 flex flex-col gap-3">
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/cta font-sans text-[12px] uppercase tracking-[0.12em] text-soft-brown hover:text-off-black transition-colors duration-200 flex items-center gap-2 w-fit"
                          >
                            Check Availability
                            <span className="transition-transform duration-300 group-hover/cta:translate-x-1">→</span>
                          </a>
                          <div className="flex items-center gap-4">
                            <Link
                              href={detailUrl}
                              className="font-sans text-[11px] text-warm-tan hover:text-soft-brown transition-colors duration-200"
                            >
                              View Details
                            </Link>
                            <span className="text-beige text-[10px]">·</span>
                            <a
                              href={villa.airbnb}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-sans text-[11px] text-warm-tan hover:text-soft-brown transition-colors duration-200"
                            >
                              View on Airbnb ↗
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              );
            })}

          </div>
        </section>

        {/* ─── FINAL CTA ────────────────────────────────────────── */}
        <section className="bg-soft-brown py-24 md:py-36">
          <div className="max-w-[520px] mx-auto px-6 text-center">
            <ScrollReveal>
              <h2 className="font-serif font-light italic text-white-warm text-[32px] md:text-[44px] leading-[1.10]">
                Not sure which villa is right for you?
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <p className="font-sans font-light text-[15px] text-white-warm/55 leading-[1.8] mt-6">
                Tell us your group size, dates, and what you&apos;re looking for.
                We&apos;ll match you with the perfect villa.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={280}>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-10 font-sans text-[11px] uppercase tracking-[0.18em] text-white-warm border border-white-warm/45 hover:bg-white-warm hover:text-soft-brown px-10 py-[16px] transition-all duration-300"
              >
                Message Us on WhatsApp →
              </a>
            </ScrollReveal>
          </div>
        </section>

      </main>

      {/* ─── FOOTER ───────────────────────────────────────────── */}
      <footer className="bg-off-black py-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
            <div>
              <Link href="/" className="font-sans text-[11px] uppercase tracking-[0.22em] text-white-warm/75 hover:text-white-warm transition-colors duration-300">
                Bali Five Stars Villas
              </Link>
              <p className="font-sans font-light text-[13px] text-white-warm/35 mt-3 leading-[1.7]">
                Luxury villa rentals in Bali, Indonesia.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/" className="font-sans text-[12px] text-white-warm/50 hover:text-white-warm transition-colors duration-300 w-fit">Home</Link>
              <a href="/contact" className="font-sans text-[12px] text-white-warm/50 hover:text-white-warm transition-colors duration-300 w-fit">Contact</a>
              href="https://api.whatsapp.com/send?phone=6282146574879&text=Hi%2C%20I%E2%80%99d%20like%20to%20check%20availability%20and%20the%20best%20direct%20rate%20for%20your%20villas%20in%20Bali."
                +62 821-4657-4879
              </a>
            </div>
          </div>
          <div className="w-full h-px bg-white-warm/8 mt-10 mb-5" />
          <p className="font-sans text-[11px] text-white-warm/22">© 2025 Bali Five Stars Villas · All rights reserved</p>
        </div>
      </footer>
    </>
  );
}
