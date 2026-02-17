import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { HomeBrands } from "@/components/home/HomeBrands";
import { CoverageTeaser } from "@/components/home/CoverageTeaser";
import { BusinessSection } from "@/components/home/BusinessSection";
import { Testimonials } from "@/components/home/Testimonials";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <HowItWorks />
      <HomeBrands />
      <CoverageTeaser />
      <BusinessSection />
      <Testimonials />
      <FinalCTA />
    </div>
  );
}
