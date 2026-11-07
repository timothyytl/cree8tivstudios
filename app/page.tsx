import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { About } from "@/components/home/About";
import { Ambient } from "@/components/home/Ambient";
import { AppsTrack } from "@/components/home/AppsTrack";
import { HowWeWork } from "@/components/home/HowWeWork";
import { Statement } from "@/components/home/Statement";
import { StudioHero } from "@/components/home/StudioHero";
import { Testimonials } from "@/components/home/Testimonials";

export default function Home() {
  return (
    <div className="home">
      <Ambient />
      <Header />
      <main id="main">
        <StudioHero />
        <Statement />
        <HowWeWork />
        <AppsTrack />
        <Testimonials />
        <About />
      </main>
      <Footer />
    </div>
  );
}
