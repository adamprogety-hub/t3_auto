import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { Hero } from "@/components/sections/hero";
import { StoriesBar } from "@/components/sections/stories-bar";
import { Problems } from "@/components/sections/problems";
import { Services } from "@/components/sections/services";
import { WhyUs } from "@/components/sections/why-us";
import { Vendors } from "@/components/sections/vendors";
import { Cooperation } from "@/components/sections/cooperation";
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
        <StoriesBar />
        <Problems />
        <Services />
        <WhyUs />
        <Vendors />
        <Cooperation />
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
