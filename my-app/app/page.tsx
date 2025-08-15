import { NavbarDemo } from "@/components/Navbar";
import React from "react";
import { TextReveal } from "@/components/magicui/text-reveal";
import FeaturesSection from "@/components/landingpage/features";
import PricingSection from "@/components/landingpage/pricing-section";
import ContactSection from "@/components/landingpage/contact-section";
import Footer from "@/components/landingpage/footer";
import Hero from "@/components/landingpage/hero";
export default function Page() {
  return (
    <main className="min-h-screen">
      <NavbarDemo />
      <Hero />
      <TextReveal>CenterPlus will change the way you Manage</TextReveal>
      <section id="features" className="min-h-screen">
        <FeaturesSection />
      </section>
      <section id="pricing">
        <PricingSection />
      </section>
      <section id="contact">
        <ContactSection />
      </section>
      <Footer />
    </main>
  );
}
