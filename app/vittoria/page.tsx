import VillaPage from "@/components/VillaPage";
import { villas } from "@/lib/villas";

export default function Vittoria() {
  return <VillaPage villa={villas.find((v) => v.slug === "vittoria")!} />;
}
