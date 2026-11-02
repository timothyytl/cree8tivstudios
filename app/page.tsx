import { AppsSection } from "@/components/apps/AppsSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { KineticBand } from "@/components/KineticBand";
import { Principles } from "@/components/Principles";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <AppsSection />
        <KineticBand />
        <Principles />
      </main>
      <Footer />
    </>
  );
}
