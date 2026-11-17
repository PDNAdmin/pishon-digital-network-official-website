"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import { FadeUp } from "@/components/motion/Reveal";
import { videos, results, quotes, type VideoProof } from "@/lib/proof";

export function PlaceholderTag() {
  return <span className="t-label rounded-full border border-current px-2 py-1 text-[10px] opacity-60">Placeholder</span>;
}

/** `big` fills its grid cell on desktop; `tall` is a fixed portrait card. */
export function VideoCard({ v, big, tall, onPlay }: { v: VideoProof; big?: boolean; tall?: boolean; onPlay: () => void }) {
  return (
    <button
      type="button"
      onClick={onPlay}
      data-cursor="Play"
      data-tilt
      aria-label={`Play the ${v.business.toLowerCase()}'s story`}
      className={`group relative block w-full overflow-hidden rounded-[var(--radius-card)] bg-grey-900 text-left ${tall ? "aspect-[4/5]" : big ? "aspect-[4/5] lg:aspect-auto lg:h-full" : "aspect-[16/9]"}`}
    >
      <Image
        src={big || tall ? v.posterMobile : v.poster}
        alt=""
        fill
        sizes={big ? "(min-width:1024px) 45vw, 100vw" : "(min-width:1024px) 50vw, 100vw"}
        className="object-cover transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
      />
      <span className="absolute inset-0 bg-linear-to-t from-ink/70 via-transparent to-transparent" aria-hidden />
      <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold text-ink transition-transform duration-300 group-hover:scale-110">
        <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6" fill="currentColor" aria-hidden>
          <path d="M7 4.5v15l13-7.5z" />
        </svg>
      </span>
      <span className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3 text-paper">
        <span>
          <span className="block font-medium">{v.business}</span>
          <span className="t-label text-paper/70">{v.place}</span>
        </span>
        {v.placeholder && <PlaceholderTag />}
      </span>
    </button>
  );
}

export default function Proof() {
  const [open, setOpen] = useState<VideoProof | null>(null);


  return (
    <section className="section-pad pt-0 lg:pt-0">
      <div className="container-pdn">
        <SectionHeader index="05" label="Real businesses, real results" title="Don't take our word for it." aside="Hear it from the people we've built for, in their own words." />

        {/* Bento: big video | result + quote | wide video */}
        <FadeUp stagger={0.08} className="mt-16 grid gap-4 lg:mt-20 lg:grid-cols-12 lg:grid-rows-[auto_auto] lg:gap-5">
          <div className="lg:col-span-5 lg:row-span-2">
            <VideoCard v={videos[0]} big onPlay={() => setOpen(videos[0])} />
          </div>

          <div className="flex flex-col justify-between rounded-[var(--radius-card)] border border-grey-200 bg-white p-8 lg:col-span-3">
            <div className="flex items-start justify-between">
              <p className="t-label text-grey-500">Result</p>
              {results[0].placeholder && <PlaceholderTag />}
            </div>
            <p className="t-display mt-10">{results[0].figure}</p>
            <div className="mt-6">
              <p className="font-medium">{results[0].context}</p>
              <p className="mt-1 text-sm text-grey-500">{results[0].business}</p>
            </div>
          </div>

          <figure className="flex flex-col justify-between rounded-[var(--radius-card)] bg-ink p-8 text-paper lg:col-span-4">
            <div className="flex items-start justify-between">
              <p className="t-label text-paper/60">In their words</p>
              {quotes[0].placeholder && <PlaceholderTag />}
            </div>
            <blockquote className="t-h3 balance mt-10">“{quotes[0].quote}”</blockquote>
            <figcaption className="mt-8 text-sm text-paper/70">
              <span className="block font-medium text-paper">{quotes[0].name}</span>
              {quotes[0].business}
            </figcaption>
          </figure>

          <div className="lg:col-span-7">
            <VideoCard v={videos[1]} onPlay={() => setOpen(videos[1])} />
          </div>
        </FadeUp>

        <div className="mt-12">
          <Button href="/work" variant="secondary">See all our work</Button>
        </div>
      </div>

      <VideoModal open={open} onClose={() => setOpen(null)} />
    </section>
  );
}

/** Full-screen player for a client story. Esc or a click outside closes it. */
export function VideoModal({ open, onClose }: { open: VideoProof | null; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (

        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${open.business}'s story`}
          className="on-ink fixed inset-0 z-[90] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
          onClick={() => onClose()}
        >
          <div className="relative w-full max-w-5xl overflow-hidden rounded-[var(--radius-card)] bg-black" onClick={(e) => e.stopPropagation()}>
            {open.videoUrl ? (
              <video src={open.videoUrl} controls autoPlay playsInline className="aspect-video w-full" />
            ) : (
              <div className="relative aspect-video w-full">
                <Image src={open.poster} alt="" fill sizes="90vw" className="object-cover opacity-50" />
                <p className="absolute inset-0 flex items-center justify-center p-8 text-center t-h3 text-paper">
                  Client video coming soon.
                </p>
              </div>
            )}
            <button
              type="button"
              autoFocus
              onClick={() => onClose()}
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-paper text-ink"
              aria-label="Close video"
            >
              ✕
            </button>
          </div>
        </div>
      
  );
}
