import VillaPage from "@/components/VillaPage";
import { villas } from "@/lib/villas";

export default function Aurea() {
  return <VillaPage villa={villas.find((v) => v.slug === "aurea")!} />;
}
