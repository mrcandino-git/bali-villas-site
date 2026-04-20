import { notFound } from "next/navigation";
import VillaPage from "@/components/VillaPage";
import { villas } from "@/lib/villas";

export function generateStaticParams() {
  return villas.map((v) => ({ slug: `villa-${v.slug}` }));
}

export default async function VillaRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const villaSlug = slug.replace(/^villa-/, "");
  const villa = villas.find((v) => v.slug === villaSlug);

  if (!villa) notFound();

  return <VillaPage villa={villa} bookedDates={[]} />;
}