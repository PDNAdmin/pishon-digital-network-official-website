"use client";
import { useState } from "react";
import { VideoCard, VideoModal } from "@/components/home/Proof";
import { FadeUp } from "@/components/motion/Reveal";
import { videos, type VideoProof } from "@/lib/proof";

/** Client video stories (from lib/proof.ts). Placeholders show a visible tag until real videos arrive. */
export default function Stories() {
  const [open, setOpen] = useState<VideoProof | null>(null);
  return (
    <>
      <FadeUp stagger={0.08} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {videos.map((v) => (
          <VideoCard key={v.poster} v={v} tall onPlay={() => setOpen(v)} />
        ))}
      </FadeUp>
      <VideoModal open={open} onClose={() => setOpen(null)} />
    </>
  );
}
