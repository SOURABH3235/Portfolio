"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: string;
  accentWord?: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  accentWord,
  description,
  className,
  align = "left",
}: Props) {
  const parts =
    accentWord && title.includes(accentWord)
      ? title.split(accentWord)
      : [title];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "mb-12 max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-3 font-display text-xs uppercase tracking-[0.35em] text-accent">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl">
        {parts.length === 2 ? (
          <>
            {parts[0]}
            <span className="text-accent">{accentWord}</span>
            {parts[1]}
          </>
        ) : (
          title
        )}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-white/60 md:text-lg">
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}
