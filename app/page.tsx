import { AppGallery } from "@/components/AppGallery";
import { DayTimeline } from "@/components/DayTimeline";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { Sky } from "@/components/Sky";

export default function Home() {
  return (
    <>
      <Sky />
      <Header />
      <main id="main">
        <Hero />
        <DayTimeline />
        <AppGallery />
        <Manifesto />
      </main>
      <Footer />
    </>
  );
}
