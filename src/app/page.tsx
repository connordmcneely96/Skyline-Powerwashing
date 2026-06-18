import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { Services } from "@/components/sections/services";
import { BeforeAfter } from "@/components/sections/before-after";
import { Difference } from "@/components/sections/difference";
import { CtaBanner } from "@/components/sections/cta-banner";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Services />
      <BeforeAfter />
      <Difference />
      <CtaBanner />
    </>
  );
}
