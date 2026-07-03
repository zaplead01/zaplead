import { Header } from "@/src/components/landing/layout/header";
import { Hero } from "@/src/components/landing/sections/hero";
import { Stats } from "@/src/components/landing/sections/stats";
import { Features } from "@/src/components/landing/sections/features";
import { HowItWorks } from "@/src/components/landing/sections/how-it-works";
import { Benefits } from "@/src/components/landing/sections/benefits";
import { ProductPreview } from "@/src/components/landing/sections/product-preview";
import { PricingPreview } from "@/src/components/landing/sections/pricing-preview";
import { Testimonials } from "@/src/components/landing/sections/testimonials";

import { CTA } from "@/src/components/landing/sections/cta";
import { Footer } from "@/src/components/landing/layout/footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <Benefits />
      <ProductPreview />
      <PricingPreview />
      <Testimonials />
      {/* <FAQ /> */}
      <CTA />
      <Footer />
    </>
  );
}