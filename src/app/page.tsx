import Nav from "@/components/layout/Nav";
import Hero from "@/components/sections/Hero";
import PlatformStrip from "@/components/sections/PlatformStrip";
import LogoMarquee from "@/components/sections/LogoMarquee";
import HeroCollage from "@/components/sections/HeroCollage";
import CapabilityNetwork from "@/components/sections/CapabilityNetwork";
import HowWeWork from "@/components/sections/HowWeWork";
import BriefFlow from "@/components/sections/BriefFlow";
import AnchorPhilosophy from "@/components/sections/AnchorPhilosophy";
import CinematicBreak from "@/components/sections/CinematicBreak";
import SelectedWork from "@/components/sections/SelectedWork";
import HilaryTestimonial from "@/components/sections/HilaryTestimonial";
import RiseGuarantee from "@/components/sections/RiseGuarantee";
import BuiltOn from "@/components/sections/BuiltOn";
import ContactForm from "@/components/sections/ContactForm";
import Footer from "@/components/sections/Footer";
import WhatYouTakeWithYou from "@/components/sections/WhatYouTakeWithYou";

// Homepage assembly — BD-005, zero dividers, alternating canvas surfaces.
// Order per CARRY-OVER §2 + autonomous build elevation 2026-05-19.
export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <PlatformStrip />
        <LogoMarquee />
        <HeroCollage />
        <CapabilityNetwork />
        <HowWeWork />
        <BriefFlow />
        <AnchorPhilosophy />
        <CinematicBreak />
        <SelectedWork />
        <HilaryTestimonial />
        <RiseGuarantee />
        <WhatYouTakeWithYou />
        <BuiltOn />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
