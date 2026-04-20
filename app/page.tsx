import Image from "next/image";
import Navbar from "./components/Navbar";
import VillaCard from "./components/VillaCard";
import ScrollReveal from "./components/ScrollReveal";
import { villas, WHATSAPP_URL } from "@/lib/villas";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="overflow-x-hidden">

        {/* ─── HERO ─────────────────────────────────────────────── */}
        <section className="relative h-screen min-h-[600px]">
          <Image
            src="/villas/villa-vittoria/hero.jpg"
            alt="Bali villa"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/62" />

          <div className="absolute bottom-16 sm:bottom-22 md:bottom-28 lg:bottom-32 left-6 md:left-16 lg:left-24 right-6 md:right-auto">
            <p className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.28em] text-white-warm/55 mb-5">
              Seminyak · Petitenget · Canggu
            </p>
            <h1 className="font-serif font-light italic text-white-warm leading-[1.02] text-[48px] sm:text-[62px] md:text-[78px] lg:text-[92px] max-w-[720px]">
              Bali, as it was always meant to feel.
            </h1>
            <p className="font-sans font-light text-[13px] text-white-warm/44 mt-4 mb-9">
              Five private villas. Book directly. No agencies.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group font-sans text-[12px] uppercase tracking-[0.14em] text-white-warm flex items-center gap-2 w-fit"
            >
              <span className="border-b border-white-warm/38 group-hover:border-white-warm transition-colors duration-300 pb-px">
                Check Availability
              </span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>

          <div className="absolute bottom-7 left-1/2 -translate-x-1/2 animate-bounce">
            <span className="text-white-warm/32 text-base">↓</span>
          </div>
        </section>

        {/* ─── EXPERIENCE STATEMENT ─────────────────────────────── */}
        <section className="bg-cream py-28 md:py-44">
          <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
            <div className="max-w-[680px]">

              <ScrollReveal>
                <div className="w-20 h-px bg-warm-tan mb-12" />
              </ScrollReveal>

              <ScrollReveal delay={120}>
                <h2 className="font-serif font-light italic text-off-black leading-[1.12] text-[34px] sm:text-[44px] md:text-[54px] lg:text-[62px]">
                  Luxury is not a thread count.
                  <br />
                  It is the sound of your pool
                  <br />
                  in the morning — and nothing else.
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={240}>
                <p className="font-sans font-light text-[16px] md:text-[17px] text-soft-brown leading-[1.85] mt-10">
                  We curate private villas across Bali&apos;s finest neighborhoods.
                  <br className="hidden md:block" />
                  Where service is quiet, space is entirely yours,
                  <br className="hidden md:block" />
                  and every day moves at your own pace.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={360}>
                <div className="w-20 h-px bg-warm-tan mt-12" />
              </ScrollReveal>

            </div>
          </div>
        </section>

        {/* ─── MIXED IMAGE LAYOUT ───────────────────────────────── */}
        <section className="bg-cream pb-28 md:pb-44">
          <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">

            <ScrollReveal>
              <div className="flex items-center justify-between mb-5">
                <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-warm-tan">
                  Bali Five Stars Villas
                </span>
                <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-warm-tan">
                  Since 2018
                </span>
              </div>
              <div className="w-full h-px bg-beige mb-10" />
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-5 md:gap-7 items-start">

              {/* Left: tall portrait image */}
              <ScrollReveal>
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src="/villas/villa-vittoria/exterior.jpg"
                    alt="Villa exterior"
                    fill
                    className="object-cover hover:scale-[1.03] transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                  />
                </div>
              </ScrollReveal>

              {/* Right: square + text, then landscape */}
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-5 items-end">
                  <ScrollReveal delay={100}>
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src="/villas/villa-lumira/bedroom-1.jpg"
                        alt="Villa interior"
                        fill
                        className="object-cover hover:scale-[1.03] transition-transform duration-700"
                        sizes="(max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                  </ScrollReveal>

                  <ScrollReveal delay={200}>
                    <div className="pb-2">
                      <p className="font-serif italic text-[22px] lg:text-[26px] text-off-black leading-[1.4]">
                        The details
                        <br />
                        that stay
                        <br />
                        with you.
                      </p>
                      <p className="font-sans font-light text-[13px] text-soft-brown leading-[1.78] mt-4 hidden md:block">
                        From the morning light to the linen, every element is
                        chosen deliberately. Beauty you can live in.
                      </p>
                    </div>
                  </ScrollReveal>
                </div>

                <ScrollReveal delay={280}>
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src="/villas/villa-salty/exterior.jpg"
                      alt="Villa living space"
                      fill
                      className="object-cover hover:scale-[1.03] transition-transform duration-700"
                      sizes="(max-width: 1024px) 100vw, 58vw"
                    />
                  </div>
                </ScrollReveal>
              </div>

            </div>
          </div>
        </section>

        {/* ─── FULLSCREEN IMAGE BREAK ───────────────────────────── */}
        <section className="relative h-[70vh] min-h-[400px] overflow-hidden">
          <Image
            src="/villas/villa-aurea/exterior.jpg"
            alt="Bali villa at golden hour"
            fill
            className="object-cover object-[center_35%]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/30" />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <ScrollReveal>
              <p className="font-serif font-light italic text-white-warm text-[28px] sm:text-[38px] md:text-[50px] lg:text-[58px] leading-[1.15]">
                Some mornings, you understand
                <br />
                why you came.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.20em] text-white-warm/50 mt-6">
                This is Bali at its most personal.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* ─── VILLAS GRID ──────────────────────────────────────── */}
        <section className="bg-sand py-24 md:py-36">
          <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">

            <ScrollReveal>
              <div className="flex items-baseline justify-between mb-5">
                <h2 className="font-serif font-light text-[36px] md:text-[48px] text-off-black">
                  Our Villas
                </h2>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:block font-sans text-[11px] uppercase tracking-[0.12em] text-soft-brown pb-px border-b border-transparent hover:border-soft-brown transition-colors duration-300"
                >
                  Book Direct on WhatsApp →
                </a>
              </div>
              <div className="w-full h-px bg-beige mb-8" />
              <p className="font-serif italic text-[18px] md:text-[22px] text-soft-brown leading-[1.5] mb-12">
                Five properties. Three neighborhoods. One standard of excellence.
              </p>
            </ScrollReveal>

            {/* Row 1: 3 villas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {villas.slice(0, 3).map((villa, i) => (
                <VillaCard key={villa.slug} villa={villa} delay={i * 90} />
              ))}
            </div>

            {/* Row 2: 2 villas, centered */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10 mt-8 md:mt-10 lg:w-2/3 lg:mx-auto">
              {villas.slice(3).map((villa, i) => (
                <VillaCard key={villa.slug} villa={villa} delay={(i + 3) * 90} />
              ))}
            </div>

            <div className="mt-12 md:hidden text-center">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-[12px] uppercase tracking-[0.12em] text-soft-brown border-b border-soft-brown pb-1"
              >
                Book Direct on WhatsApp →
              </a>
            </div>

          </div>
        </section>

        {/* ─── TRUST / SOCIAL PROOF ─────────────────────────────── */}
        <section className="bg-cream py-24 md:py-44">
          <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
            <div className="max-w-[680px]">

              <ScrollReveal>
                <h2 className="font-serif font-light italic text-[32px] md:text-[42px] text-off-black">
                  In their words.
                </h2>
                <div className="w-20 h-px bg-warm-tan mt-5 mb-4" />
                <p className="font-sans font-light text-[14px] text-soft-brown leading-[1.75]">
                  Every stay is personal. Every detail, considered.
                  <br />
                  These are the stories our guests bring home.
                </p>
              </ScrollReveal>

              {/* Testimonial 1 */}
              <ScrollReveal delay={100} className="relative mt-14">
                <span
                  aria-hidden="true"
                  className="absolute -top-5 -left-1 font-serif text-[120px] leading-none text-beige select-none pointer-events-none"
                >
                  &ldquo;
                </span>
                <blockquote className="relative font-serif italic text-[19px] md:text-[24px] text-off-black leading-[1.55]">
                  &ldquo;We booked direct and it was the best decision we made
                  for our honeymoon. The villa felt entirely ours.&rdquo;
                </blockquote>
                <div className="mt-5 md:text-right">
                  <p className="font-sans text-[13px] text-soft-brown">— Sarah &amp; James, London</p>
                  <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-warm-tan mt-1">
                    Villa Vittoria · March 2025
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={60} className="my-10">
                <div className="w-full h-px bg-beige" />
              </ScrollReveal>

              {/* Testimonial 2 */}
              <ScrollReveal delay={100}>
                <blockquote className="font-serif italic text-[19px] md:text-[24px] text-off-black leading-[1.55]">
                  &ldquo;Completely private. Completely perfect. We&apos;re
                  already planning our return.&rdquo;
                </blockquote>
                <div className="mt-5 md:text-right">
                  <p className="font-sans text-[13px] text-soft-brown">— Marco R., Milan</p>
                  <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-warm-tan mt-1">
                    Villa Lumira · January 2025
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={60} className="my-10">
                <div className="w-full h-px bg-beige" />
              </ScrollReveal>

              {/* Testimonial 3 */}
              <ScrollReveal delay={100}>
                <blockquote className="font-serif italic text-[19px] md:text-[24px] text-off-black leading-[1.55]">
                  &ldquo;The team replied within minutes on WhatsApp. Better
                  than any hotel we&apos;ve ever stayed in.&rdquo;
                </blockquote>
                <div className="mt-5 md:text-right">
                  <p className="font-sans text-[13px] text-soft-brown">— Priya M., Singapore</p>
                  <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-warm-tan mt-1">
                    Villa Aurea · February 2025
                  </p>
                </div>
              </ScrollReveal>

            </div>
          </div>
        </section>

        {/* ─── FINAL CTA ────────────────────────────────────────── */}
        <section className="bg-soft-brown py-28 md:py-44">
          <div className="max-w-[560px] mx-auto px-6 text-center">

            <ScrollReveal>
              <h2 className="font-serif font-light italic text-white-warm text-[34px] sm:text-[44px] md:text-[54px] lg:text-[62px] leading-[1.08]">
                Your Bali villa is waiting.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={160}>
              <p className="font-sans font-light text-[15px] md:text-[16px] text-white-warm/58 leading-[1.82] mt-7">
                No booking engines. No agencies. Just us, your villa, and the island.
                <br />
                Tell us your dates — we&apos;ll handle everything else.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={290}>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-12 font-sans text-[11px] uppercase tracking-[0.18em] text-white-warm border border-white-warm/48 hover:bg-white-warm hover:text-soft-brown px-12 py-[18px] transition-all duration-300"
              >
                Message Us on WhatsApp →
              </a>
            </ScrollReveal>

            <ScrollReveal delay={380}>
              <p className="font-sans text-[12px] text-white-warm/38 mt-8">+62 821-4657-4879</p>
              <p className="font-sans text-[10px] uppercase tracking-[0.14em] text-white-warm/26 mt-2">
                We reply within 2 hours.
              </p>
            </ScrollReveal>

          </div>
        </section>

      </main>

      {/* ─── FOOTER ───────────────────────────────────────────── */}
      <footer className="bg-off-black py-16 md:py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10 md:gap-0">
            <div>
              <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-white-warm/75">
                Bali Five Stars Villas
              </p>
              <p className="font-sans font-light text-[13px] text-white-warm/35 mt-3 leading-[1.7]">
                Luxury villa rentals
                <br />
                in Bali, Indonesia.
              </p>
            </div>
            <div className="flex flex-col gap-3.5">
              <a href="/villas" className="font-sans text-[12px] text-white-warm/50 hover:text-white-warm transition-colors duration-300 w-fit">
                Villas
              </a>
              <a href="/contact" className="font-sans text-[12px] text-white-warm/50 hover:text-white-warm transition-colors duration-300 w-fit">
                Contact
              </a>
              <a
                href="https://wa.me/6282146574879"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-[12px] text-white-warm/50 hover:text-white-warm transition-colors duration-300 w-fit"
              >
                +62 821-4657-4879
              </a>
            </div>
          </div>
          <div className="w-full h-px bg-white-warm/8 mt-12 mb-6" />
          <p className="font-sans text-[11px] text-white-warm/22">
            © 2025 Bali Five Stars Villas · All rights reserved
          </p>
        </div>
      </footer>
    </>
  );
}
