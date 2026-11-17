/**
 * CASE STUDIES. Real client work only. Never invent results, quotes or client names.
 * Every entry marked `placeholder: true` shows a visible "Placeholder" tag on the page,
 * so it can't ship by accident. Replace each one with a real project (or delete it).
 *
 * To add a real project: copy an entry, set placeholder: false, fill every field with
 * the client's real details, and drop its images into /public/images/work/<slug>/.
 */

export type Service = "website" | "assistant";

export type CaseStudy = {
  slug: string;
  client: string; // business name, as the client is happy to be named
  industry: string; // e.g. "Real estate"
  place: string; // e.g. "Lekki, Lagos"
  services: Service[];
  cover: string; // card + hero image
  coverAlt: string;
  headline: string; // the outcome, in plain words
  problem: string; // what was going wrong, in the owner's words (from the client)
  built: string[]; // what we actually built
  results: { figure: string; label: string }[]; // REAL numbers only
  quote?: { text: string; name: string; role: string };
  before?: string; // before/after screenshots (websites)
  after?: string;
  liveUrl?: string;
  videoUrl?: string;
  timeline: string; // e.g. "3 weeks"
  placeholder?: boolean;
};

const TODO_PROBLEM = "The owner's own words about what was going wrong before. Ask them on the wrap-up call and quote them exactly.";
const TODO_RESULT = { figure: "—", label: "A real, measured result goes here" };

export const CASES: CaseStudy[] = [
  {
    slug: "real-estate-lekki",
    client: "Real estate agency",
    industry: "Real estate",
    place: "Lekki, Lagos",
    services: ["website", "assistant"],
    cover: "/images/posters/testimonial-realestate-placeholder.jpg",
    coverAlt: "Placeholder photo of a business owner (replace with the client project)",
    headline: "The outcome for this client, in one plain sentence.",
    problem: TODO_PROBLEM,
    built: ["What we built, step one", "What we built, step two", "What we built, step three"],
    results: [TODO_RESULT, TODO_RESULT],
    timeline: "— weeks",
    placeholder: true,
  },
  {
    slug: "law-firm-victoria-island",
    client: "Law firm",
    industry: "Legal",
    place: "Victoria Island, Lagos",
    services: ["website"],
    cover: "/images/posters/testimonial-law-placeholder.jpg",
    coverAlt: "Placeholder photo of a business owner (replace with the client project)",
    headline: "The outcome for this client, in one plain sentence.",
    problem: TODO_PROBLEM,
    built: ["What we built, step one", "What we built, step two", "What we built, step three"],
    results: [TODO_RESULT, TODO_RESULT],
    timeline: "— weeks",
    placeholder: true,
  },
  {
    slug: "clinic-abuja",
    client: "Clinic",
    industry: "Healthcare",
    place: "Abuja",
    services: ["assistant"],
    cover: "/images/posters/testimonial-clinic-placeholder.jpg",
    coverAlt: "Placeholder photo of a business owner (replace with the client project)",
    headline: "The outcome for this client, in one plain sentence.",
    problem: TODO_PROBLEM,
    built: ["What we built, step one", "What we built, step two", "What we built, step three"],
    results: [TODO_RESULT, TODO_RESULT],
    timeline: "— weeks",
    placeholder: true,
  },
  {
    slug: "hotel-maitama",
    client: "Hotel",
    industry: "Hospitality",
    place: "Maitama, Abuja",
    services: ["website", "assistant"],
    cover: "/images/posters/testimonial-hotel-placeholder.jpg",
    coverAlt: "Placeholder photo of a business owner (replace with the client project)",
    headline: "The outcome for this client, in one plain sentence.",
    problem: TODO_PROBLEM,
    built: ["What we built, step one", "What we built, step two", "What we built, step three"],
    results: [TODO_RESULT, TODO_RESULT],
    timeline: "— weeks",
    placeholder: true,
  },
  {
    slug: "restaurant-lagos",
    client: "Restaurant",
    industry: "Food & drink",
    place: "Lagos",
    services: ["website"],
    cover: "/images/posters/testimonial-restaurant-placeholder.jpg",
    coverAlt: "Placeholder photo of a business owner (replace with the client project)",
    headline: "The outcome for this client, in one plain sentence.",
    problem: TODO_PROBLEM,
    built: ["What we built, step one", "What we built, step two", "What we built, step three"],
    results: [TODO_RESULT, TODO_RESULT],
    before: "/images/ui/before.jpg",
    after: "/images/ui/after.jpg",
    timeline: "— weeks",
    placeholder: true,
  },
  {
    slug: "salon-lagos",
    client: "Salon",
    industry: "Beauty",
    place: "Lagos",
    services: ["assistant"],
    cover: "/images/posters/testimonial-salon-placeholder.jpg",
    coverAlt: "Placeholder photo of a business owner (replace with the client project)",
    headline: "The outcome for this client, in one plain sentence.",
    problem: TODO_PROBLEM,
    built: ["What we built, step one", "What we built, step two", "What we built, step three"],
    results: [TODO_RESULT, TODO_RESULT],
    timeline: "— weeks",
    placeholder: true,
  },
];

export const SERVICE_LABEL: Record<Service, string> = { website: "Website", assistant: "AI assistant" };
export const caseBySlug = (slug: string) => CASES.find((c) => c.slug === slug);
