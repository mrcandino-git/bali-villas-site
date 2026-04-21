import Image from "next/image";
import Link from "next/link";
import { Villa, villaHeroImage, villaWhatsappUrl } from "@/lib/villas";

export default function VillaCard({
  villa,
}: {
  villa: Villa;
  delay?: number;
}) {
  const image = villaHeroImage(villa);
  const waUrl = villaWhatsappUrl(villa);
  const detailUrl = `/villas/villa-${villa.slug}`;

  return (
    <div className="group">
      <Link href={detailUrl} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={image}
            alt={villa.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </Link>

      <div className="pt-5">
        <Link href={detailUrl}>
          <h3 className="font-serif text-[22px] text-off-black leading-tight hover:text-soft-brown transition-colors duration-200">
            {villa.name}
          </h3>
        </Link>

        <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-warm-tan mt-2">
          {villa.location}
        </p>

        <div className="mt-4 flex flex-col gap-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/cta font-sans text-[12px] text-soft-brown hover:text-off-black transition-colors duration-200 flex items-center gap-1.5 w-fit"
          >
            Check Availability
            <span className="transition-transform duration-300 group-hover/cta:translate-x-1">
              →
            </span>
          </a>

          <a
            href={villa.airbnb}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[11px] text-warm-tan hover:text-soft-brown transition-colors duration-200 w-fit"
          >
            View on Airbnb ↗
          </a>
        </div>
      </div>
    </div>
  );
}