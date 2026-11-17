"use client";
import Button from "@/components/ui/Button";
import { FadeUp, RevealText } from "@/components/motion/Reveal";
import SiteMock, { BrowserFrame, PhoneFrame } from "./SiteMock";

export default function WebsiteHero() {
  return (
    <section className="pt-[104px] lg:pt-[136px]">
      <div className="container-pdn">
        <p className="t-label mb-6 text-grey-500 lg:mb-8">Websites</p>
        <div className="grid grid-cols-12 items-end gap-x-6 gap-y-8">
          <RevealText as="h1" immediate delay={0.1} className="t-hero balance col-span-12 lg:col-span-8">
            A website that makes people pick you, not the place down the road.
          </RevealText>
          <FadeUp className="col-span-12 lg:col-span-4" delay={0.4}>
            <p className="t-body-lg pretty text-grey-700">
              Your website is your first impression. We build ones that look as good as your business really is, work
              perfectly on phones, and turn visitors into calls and bookings.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Button href="/contact?for=website">Get your website</Button>
              <a href="#how-it-works" className="group inline-flex items-center gap-2 font-medium">
                See what&apos;s inside
                <span className="inline-block transition-transform duration-300 group-hover:translate-y-1">↓</span>
              </a>
            </div>
          </FadeUp>
        </div>

        {/* live example site: desktop + phone, scrolling on their own */}
        <FadeUp delay={0.3} className="relative mt-14 lg:mt-20">
          <div className="rounded-[var(--radius-frame)] bg-grey-200/60 p-4 sm:p-8 lg:p-14">
            <div className="relative">
              <div className="hidden sm:block sm:w-[82%] lg:w-[80%]">
                <BrowserFrame>
                  <SiteMock device="desktop" autoTour />
                </BrowserFrame>
              </div>
              <div className="mx-auto w-[72%] max-w-[300px] sm:absolute sm:-bottom-6 sm:right-0 sm:mx-0 sm:w-[24%] sm:max-w-none lg:-bottom-10">
                <PhoneFrame>
                  <SiteMock device="phone" autoTour />
                </PhoneFrame>
              </div>
            </div>
          </div>
          <p className="mt-5 flex items-center gap-3 text-sm text-grey-500">
            <span className="h-2 w-2 rounded-full bg-gold" aria-hidden />
            Example website, live on this page. We built it the way we&apos;d build yours.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
