import VillaPage from "@/components/VillaPage";
import { villas } from "@/lib/villas";

export default function Lumira() {
  return <VillaPage villa={villas.find((v) => v.slug === "lumira")!} />;
}
