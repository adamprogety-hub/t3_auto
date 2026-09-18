import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { Hero } from "@/components/sections/hero";
import { Problems } from "@/components/sections/problems";
import { Services } from "@/components/sections/services";
import { WhyUs } from "@/components/sections/why-us";
import { Calculator } from "@/components/sections/calculator";
import { Projects } from "@/components/sections/projects";
import { Process } from "@/components/sections/process";
import { LeadMagnet } from "@/components/sections/lead-magnet";
import { FAQ } from "@/components/sections/faq";
import { Contacts } from "@/components/sections/contacts";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Problems />
        <Services />
        <WhyUs />
        <Calculator />
        <Projects />
        <Process />
        <LeadMagnet />
        <FAQ />
        <Contacts />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
