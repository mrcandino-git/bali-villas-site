import Navbar from "../components/Navbar";
import { villas, defaultWhatsappUrl } from "@/lib/villas";
export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-cream text-off-black pt-32 md:pt-40">
        <section className="max-w-[900px] mx-auto px-6 md:px-16 lg:px-24 pb-24 md:pb-32">
          <p className="font-sans text-[10px] uppercase tracking-[0.24em] text-warm-tan mb-5">
            Contact
          </p>

          <h1 className="font-serif font-light italic text-[42px] sm:text-[54px] md:text-[68px] leading-[1.05] text-off-black">
            Let’s plan your stay.
          </h1>

          <p className="font-sans font-light text-[15px] md:text-[17px] text-soft-brown leading-[1.9] mt-8 max-w-[640px]">
            For availability, direct rates, and villa recommendations, contact us
            directly on WhatsApp. We reply personally and as quickly as possible.
          </p>
        </section>

        <section className="max-w-[1100px] mx-auto px-6 md:px-16 lg:px-24 pb-24 md:pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            <div className="bg-white/60 border border-beige p-8 md:p-10">
              <p className="font-sans text-[10px] uppercase tracking-[0.20em] text-warm-tan mb-4">
                WhatsApp
              </p>

              <p className="font-serif text-[26px] md:text-[32px] text-off-black leading-[1.25]">
                +62 821-4657-4879
              </p>

              <p className="font-sans font-light text-[14px] text-soft-brown leading-[1.8] mt-4">
                The fastest way to reach us for direct bookings, date checks,
                questions about the villas, and personalized assistance.
              </p>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-8 font-sans text-[11px] uppercase tracking-[0.16em] text-off-black border border-off-black/30 hover:bg-off-black hover:text-white-warm px-8 py-[16px] transition-all duration-300"
              >
                Message Us on WhatsApp →
              </a>
            </div>

            <div className="bg-white/60 border border-beige p-8 md:p-10">
              <p className="font-sans text-[10px] uppercase tracking-[0.20em] text-warm-tan mb-4">
                Booking Hours
              </p>

              <p className="font-serif text-[26px] md:text-[32px] text-off-black leading-[1.25]">
                Daily Support
              </p>

              <p className="font-sans font-light text-[14px] text-soft-brown leading-[1.8] mt-4">
                We assist with villa selection, availability, arrival details,
                and direct booking support every day.
              </p>

              <div className="mt-8 space-y-3">
                <p className="font-sans text-[13px] text-soft-brown">
                  Response time: usually within 2 hours
                </p>
                <p className="font-sans text-[13px] text-soft-brown">
                  Best for: availability, rates, and special requests
                </p>
                <p className="font-sans text-[13px] text-soft-brown">
                  Location: Bali, Indonesia
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-sand py-20 md:py-24">
          <div className="max-w-[900px] mx-auto px-6 md:px-16 lg:px-24 text-center">
            <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-warm-tan mb-5">
              Direct Booking
            </p>

            <h2 className="font-serif font-light italic text-[32px] md:text-[44px] text-off-black leading-[1.15]">
              Better rates. Direct contact. Personal service.
            </h2>

            <p className="font-sans font-light text-[15px] text-soft-brown leading-[1.85] mt-6 max-w-[680px] mx-auto">
              You can also explore our Airbnb listings for reviews and authenticity,
              then contact us directly for the best available direct rate.
            </p>

            <a
              href="/villas"
              className="inline-block mt-10 font-sans text-[11px] uppercase tracking-[0.16em] text-off-black border border-off-black/30 hover:bg-off-black hover:text-white-warm px-8 py-[16px] transition-all duration-300"
            >
              View Our Villas →
            </a>
          </div>
        </section>
      </main>
    </>
  );
}