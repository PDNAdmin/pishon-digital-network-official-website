/**
 * PROOF. Real client material only. Never invent numbers or quotes.
 * Everything marked `placeholder: true` renders with a visible "Placeholder" tag
 * so it can't ship by accident. Replace with real results, quotes and videos.
 */

export type VideoProof = {
  kind: "video";
  business: string;
  place: string;
  poster: string;
  posterMobile: string;
  videoUrl?: string; // TODO real client video (mp4/YouTube/Vimeo)
  placeholder?: boolean;
};
export type ResultProof = {
  kind: "result";
  figure: string; // e.g. "+40%" (REAL numbers only)
  context: string;
  business: string;
  placeholder?: boolean;
};
export type QuoteProof = {
  kind: "quote";
  quote: string;
  name: string;
  business: string;
  placeholder?: boolean;
};

export const videos: VideoProof[] = [
  { kind: "video", business: "Real estate agency owner", place: "Lekki", poster: "/images/posters/testimonial-realestate-placeholder.jpg", posterMobile: "/images/posters/testimonial-realestate-placeholder-mobile.jpg", placeholder: true },
  { kind: "video", business: "Law firm partner", place: "Victoria Island", poster: "/images/posters/testimonial-law-placeholder.jpg", posterMobile: "/images/posters/testimonial-law-placeholder-mobile.jpg", placeholder: true },
  { kind: "video", business: "Clinic owner", place: "Abuja", poster: "/images/posters/testimonial-clinic-placeholder.jpg", posterMobile: "/images/posters/testimonial-clinic-placeholder-mobile.jpg", placeholder: true },
  { kind: "video", business: "Hotel manager", place: "Maitama", poster: "/images/posters/testimonial-hotel-placeholder.jpg", posterMobile: "/images/posters/testimonial-hotel-placeholder-mobile.jpg", placeholder: true },
];

export const results: ResultProof[] = [
  { kind: "result", figure: "—", context: "More bookings in the first two months", business: "Client result goes here", placeholder: true },
  { kind: "result", figure: "—", context: "After-hours enquiries answered in month one", business: "Client result goes here", placeholder: true },
];

export const quotes: QuoteProof[] = [
  { kind: "quote", quote: "A short, real quote from a happy client goes here, in their own words.", name: "Client name", business: "Business, area", placeholder: true },
];
