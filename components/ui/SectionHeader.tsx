import type { ReactNode } from "react";
import { RevealText, FadeUp } from "@/components/motion/Reveal";

type Props = {
  index?: string;
  label: string;
  title: ReactNode;
  aside?: ReactNode;
  dark?: boolean;
  id?: string;
};

/** Vizcom split header: dotted rule, mono label, big headline left, support right (bottom-aligned). */
export default function SectionHeader({ index, label, title, aside, dark, id }: Props) {
  return (
    <header className={dark ? "text-paper" : "text-ink"}>
      <div className="dotted-rule mb-6" />
      <p className={`t-label mb-10 lg:mb-14 ${dark ? "text-paper/60" : "text-grey-500"}`}>
        {index && <span className="mr-3">{index}</span>}
        {label}
      </p>
      <div className="grid grid-cols-12 items-end gap-x-6 gap-y-8">
        <RevealText as="h2" id={id} className="t-h1 balance col-span-12 lg:col-span-7">
          {title}
        </RevealText>
        {aside && (
          <FadeUp className={`col-span-12 lg:col-span-4 lg:col-start-9 t-body-lg pretty ${dark ? "text-paper/75" : "text-grey-700"}`}>
            {aside}
          </FadeUp>
        )}
      </div>
    </header>
  );
}
