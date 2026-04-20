import VillaPage from "@/components/VillaPage";
import { villas } from "@/lib/villas";

export default function Lux() {
  return <VillaPage villa={villas.find((v) => v.slug === "lux")!} />;
}
