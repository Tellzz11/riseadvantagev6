import Nav from "@/components/layout/Nav";
import Hero from "@/components/sections/Hero";
import LogoMarquee from "@/components/sections/LogoMarquee";
import WhatWeDo from "@/components/sections/WhatWeDo";
import HowWeWork from "@/components/sections/HowWeWork";
import AnchorPhilosophy from "@/components/sections/AnchorPhilosophy";
import CinematicBreak from "@/components/sections/CinematicBreak";
import SelectedWork from "@/components/sections/SelectedWork";
import OrlaTestimonial from "@/components/sections/OrlaTestimonial";
import RiseGuarantee from "@/components/sections/RiseGuarantee";
import CertifiedPartners from "@/components/sections/CertifiedPartners";
import ContactForm from "@/components/sections/ContactForm";
import Footer from "@/components/sections/Footer";

// Homepage assembly — BD-005, zero dividers, alternating canvas surfaces.
// Order per CARRY-OVER §2 with v3 elements reinstated where called out.
export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1" style={{ paddingTop: "var(--header-height)" }}>
        <Hero />
        <LogoMarquee />
        <WhatWeDo />
        <HowWeWork />
        <AnchorPhilosophy />
        <CinematicBreak />
        <SelectedWork />
        <OrlaTestimonial />
        <RiseGuarantee />
        <CertifiedPartners />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
