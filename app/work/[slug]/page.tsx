import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import BeforeAfter from "@/components/home/BeforeAfter";
import { FadeUp, RevealText } from "@/components/motion/Reveal";
import { CASES, SERVICE_LABEL, caseBySlug } from "@/lib/work";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const c = caseBySlug((await params).slug);
  if (!c) return {};
  return { title: `${c.client}, ${c.place}`, description: c.headline, robots: c.placeholder ? { index: false } : undefined };
}

function Label({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return <p className={`t-label ${dark ? "text-paper/60" : "text-grey-500"}`}>{children}</p>;
}

export default async function CasePage({ params }: Params) {
  const c = caseBySlug((await params).slug);
  if (!c) notFound();
  const i = CASES.indexOf(c);
  const next = CASES[(i + 1) % CASES.length];
  const services = c.services.map((s) => SERVICE_LABEL[s]).join(" + ");

  return (
    <>
      <Nav />
      <main>
        <section className="pt-[104px] lg:pt-[136px]">
          <div className="container-pdn">
            <Link href="/work" className="group inline-flex items-center gap-2 text-grey-700 hover:text-ink">
              <span className="transition-transform group-hover:-translate-x-1" aria-hidden>←</span> All work
            </Link>

            {c.placeholder && (
              <div className="mt-8 flex items-start gap-4 rounded-[var(--radius-card)] border-2 border-gold bg-white p-5">
                <span className="t-label shrink-0 rounded-full bg-ink px-2.5 py-1 text-paper">Placeholder</span>
                <p className="text-grey-700 pretty">
                  This case study is a layout placeholder. Replace it with a real client project in <code className="font-mono text-sm">lib/work.ts</code> before launch. Never publish invented results.
                </p>
              </div>
            )}

            <div className="mt-10 grid grid-cols-12 items-end gap-x-6 gap-y-8 lg:mt-14">
              <div className="col-span-12 lg:col-span-8">
                <Label>
                  {c.industry} · {c.place}
                </Label>
                <RevealText as="h1" immediate delay={0.1} className="t-h1 balance mt-6">
                  {c.headline}
                </RevealText>
              </div>
              <FadeUp className="col-span-12 flex flex-wrap gap-2 lg:col-span-4 lg:justify-end" delay={0.3}>
                {c.services.map((s) => (
                  <span key={s} className="t-label rounded-full border border-ink px-3 py-1.5">{SERVICE_LABEL[s]}</span>
                ))}
              </FadeUp>
            </div>

            <FadeUp delay={0.3} className="relative mt-12 aspect-[16/10] overflow-hidden rounded-[var(--radius-frame)] bg-grey-200 lg:mt-16 lg:aspect-[21/9]">
              <div data-parallax className="absolute inset-0 overflow-hidden">
                <Image src={c.cover} alt={c.coverAlt} fill priority sizes="100vw" className="object-cover" />
              </div>
            </FadeUp>

            {/* facts */}
            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-y border-grey-200 py-8 md:grid-cols-4">
              {[
                ["Client", c.client],
                ["Location", c.place],
                ["What we built", services],
                ["Timeline", c.timeline],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="t-label text-grey-500">{k}</dt>
                  <dd className="mt-2 font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* the problem */}
        <section className="section-pad">
          <div className="container-pdn grid grid-cols-12 gap-x-6 gap-y-8">
            <div className="col-span-12 lg:col-span-3">
              <Label>01 · What was going wrong</Label>
            </div>
            <FadeUp className="col-span-12 lg:col-span-8 lg:col-start-5">
              <p className="t-h2 balance">“{c.problem}”</p>
            </FadeUp>
          </div>
        </section>

        {/* what we built */}
        <section className="section-pad pt-0 lg:pt-0">
          <div className="container-pdn grid grid-cols-12 gap-x-6 gap-y-10">
            <div className="col-span-12 lg:col-span-3">
              <Label>02 · What we built</Label>
            </div>
            <div className="col-span-12 lg:col-span-8 lg:col-start-5">
              <FadeUp as="ol" stagger={0.06}>
                {c.built.map((b, n) => (
                  <li key={n} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-grey-200 py-6">
                    <span className="t-label pt-1.5 text-grey-500">{String(n + 1).padStart(2, "0")}</span>
                    <span className="t-body-lg pretty">{b}</span>
                  </li>
                ))}
              </FadeUp>
              {c.before && c.after && (
                <div className="mt-12">
                  <BeforeAfter before={c.before} after={c.after} alt={`${c.client}'s website`} />
                  <p className="mt-4 text-sm text-grey-500">Drag to compare before and after.</p>
                </div>
              )}
              {c.liveUrl && (
                <div className="mt-10">
                  <Button href={c.liveUrl} variant="secondary">Visit the live website</Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* results */}
        <section className="on-ink section-pad bg-ink text-paper">
          <div className="container-pdn grid grid-cols-12 gap-x-6 gap-y-12">
            <div className="col-span-12 lg:col-span-3">
              <Label dark>03 · What changed</Label>
            </div>
            <div className="col-span-12 lg:col-span-8 lg:col-start-5">
              <FadeUp stagger={0.08} className="grid gap-10 sm:grid-cols-2">
                {c.results.map((r, n) => (
                  <div key={n} className="border-t border-grey-700 pt-6">
                    <p className="t-display">{r.figure}</p>
                    <p className="mt-4 text-paper/70 pretty">{r.label}</p>
                  </div>
                ))}
              </FadeUp>
              {c.quote && (
                <figure className="mt-20">
                  <blockquote className="t-h2 balance">“{c.quote.text}”</blockquote>
                  <figcaption className="mt-8 text-paper/70">
                    <span className="block font-medium text-paper">{c.quote.name}</span>
                    {c.quote.role}
                  </figcaption>
                </figure>
              )}
              {c.videoUrl && (
                <video src={c.videoUrl} controls playsInline className="mt-16 aspect-video w-full rounded-[var(--radius-card)] bg-black" />
              )}
            </div>
          </div>
        </section>

        {/* next project */}
        <section className="section-pad">
          <div className="container-pdn">
            <Label>Next project</Label>
            <Link href={`/work/${next.slug}`} data-cursor="View" className="group mt-8 grid items-center gap-8 md:grid-cols-[1fr_minmax(0,28rem)]">
              <div>
                <p className="t-h1 balance transition-colors group-hover:text-gold-deep">{next.headline}</p>
                <p className="t-label mt-6 text-grey-500">
                  {next.client} · {next.place}
                </p>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-grey-200">
                <Image src={next.cover} alt={next.coverAlt} fill sizes="(min-width:768px) 28rem, 100vw" className="object-cover transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]" />
              </div>
            </Link>
          </div>
        </section>

        {/* Final CTA */}
        <section className="on-ink bg-ink text-paper">
          <div className="container-pdn py-32 lg:py-44">
            <p className="t-label text-paper/60">Your turn</p>
            <RevealText as="h2" className="t-display balance mt-8 max-w-[16ch]">
              Want results like these for your business?
            </RevealText>
            <div className="mt-12 flex flex-wrap items-center gap-6">
              <Button href="/contact">Book a free call</Button>
              <p className="text-sm text-paper/60">Free, 20 minutes. No pressure, no jargon.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer showCta={false} />
    </>
  );
}
