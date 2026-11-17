import Image from "next/image";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="container-pdn flex min-h-[80vh] flex-col items-center justify-center pb-24 pt-[140px] text-center">
        <div className="relative aspect-video w-full max-w-md">
          <Image src="/images/illustrations/404.png" alt="Line drawing: a deckchair and a 'back soon' sign, with a chat bubble still talking" fill sizes="448px" className="object-contain" priority />
        </div>
        <h1 className="t-h1 mt-10">This page took the day off.</h1>
        <p className="t-body-lg mt-6 max-w-[36ch] text-grey-700">Our assistants never do, though. Let&apos;s get you somewhere useful.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href="/">Back to home</Button>
          <Button href="/contact" variant="secondary">Book a free call</Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
