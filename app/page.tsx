import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import SoundFamiliar from "@/components/home/SoundFamiliar";
import Doors from "@/components/home/Doors";
import SeeItWorking from "@/components/home/SeeItWorking";
import Steps from "@/components/home/Steps";
import Proof from "@/components/home/Proof";
import Questions from "@/components/home/Questions";
import FinalCTA from "@/components/home/FinalCTA";
import RiverLine from "@/components/motion/RiverLine";
import Industries from "@/components/home/Industries";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Industries />
        <RiverLine variant="a" height={200} className="mt-10 lg:mt-14" />
        <SoundFamiliar />
        <RiverLine variant="b" height={220} className="my-10 lg:my-16" />
        <Doors />
        <SeeItWorking />
        <Steps />
        <Proof />
        <Questions />
        <FinalCTA />
      </main>
      <Footer showCta={false} />
    </>
  );
}
