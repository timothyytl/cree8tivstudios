import { AppsSection } from "@/components/apps/AppsSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Principles } from "@/components/Principles";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <AppsSection />
        <Principles />
      </main>
      <Footer />
    </>
  );
}
