/**
 * Who we work with: makes it clear we serve any business that serves customers (B2C),
 * from professionals and companies to stores, not just salons and restaurants.
 */
const INDUSTRIES = [
  "Real estate",
  "Clinics & healthcare",
  "Law & professional services",
  "Hotels & short-lets",
  "Schools & training",
  "Retail & e-commerce",
  "Finance & insurance",
  "Beauty & wellness",
  "Restaurants & events",
  "Car dealers & logistics",
];

export default function Industries() {
  const row = (
    <ul className="flex shrink-0 items-center gap-10 pr-10" aria-hidden>
      {INDUSTRIES.map((i) => (
        <li key={i} className="flex items-center gap-10 whitespace-nowrap text-[17px] font-medium text-ink lg:text-[19px]">
          {i}
          <span className="h-1.5 w-1.5 rounded-full bg-grey-500/50" />
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-labelledby="industries-label" className="mt-20 border-y border-grey-200 lg:mt-28">
      <div className="container-pdn flex flex-col gap-4 py-6 lg:flex-row lg:items-center lg:gap-10">
        <p id="industries-label" className="t-label shrink-0 text-grey-500">
          For businesses that serve customers
        </p>
        {/* accessible list for screen readers */}
        <p className="sr-only">{INDUSTRIES.join(", ")}.</p>
        <div className="relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <div className="flex animate-[marquee_45s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:animate-none">
            {row}
            {row}
          </div>
        </div>
      </div>
    </section>
  );
}
