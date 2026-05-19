import Nav from "@/components/layout/Nav";
import Hero from "@/components/sections/Hero";
import PlatformStrip from "@/components/sections/PlatformStrip";
import LogoMarquee from "@/components/sections/LogoMarquee";
import HeroCollage from "@/components/sections/HeroCollage";
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
import WhatYouTakeWithYou from "@/components/sections/WhatYouTakeWithYou";

// Homepage assembly — BD-005, zero dividers, alternating canvas surfaces.
// Order per CARRY-OVER §2 + autonomous build elevation 2026-05-19.
export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1" style={{ paddingTop: "var(--header-height)" }}>
        <Hero />
        <PlatformStrip />
        <LogoMarquee />
        <HeroCollage />
        <WhatWeDo />
        <HowWeWork />
        <AnchorPhilosophy />
        <CinematicBreak />
        <SelectedWork />
        <OrlaTestimonial />
        <RiseGuarantee />
        <WhatYouTakeWithYou />
        <CertifiedPartners />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
