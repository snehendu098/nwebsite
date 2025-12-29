import { FloatingConstellation } from "@/components/effects";
import {
  HeroSection,
  AboutSection,
  ServicesSection,
  ProductsSection,
  PortfolioSection,
  ProcessSection,
  TeamSection,
  ContactSection,
} from "@/components/sections";

export const HomePage = () => {
  return (
    <>
      <FloatingConstellation name="orion" />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProductsSection />
      <PortfolioSection />
      <ProcessSection />
      <TeamSection />
      <ContactSection />
    </>
  );
};
