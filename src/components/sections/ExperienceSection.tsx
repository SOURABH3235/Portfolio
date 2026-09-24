"use client";

import { motion } from "framer-motion";
import { experienceItems } from "@/data/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const typeColors: Record<string, string> = {
  certification: "bg-sky-400",
  hackathon: "bg-violet-400",
  project: "bg-emerald-400",
  event: "bg-amber-400",
  achievement: "bg-accent",
};

export function ExperienceSection() {
  return (
    <section id="experience" className="relative scroll-mt-28 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Journey"
          title="Experience & achievements"
          description="Editable timeline — add new entries in src/data/experience.ts and they appear here automatically."
        />
        <div className="relative mx-auto max-w-3xl">
          <div className="absolute bottom-0 left-[11px] top-2 w-px bg-gradient-to-b from-accent via-white/20 to-transparent md:left-1/2 md:-translate-x-px" />
          <ul className="space-y-8">
            {experienceItems.map((item, i) => {
              const left = i % 2 === 0;
              return (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55 }}
                  className={cn(
                    "relative grid gap-4 md:grid-cols-2",
                    left ? "md:text-right" : "",
                  )}
                >
                  <div
                    className={cn(
                      "absolute left-0 top-3 h-6 w-6 rounded-full border-2 border-[#050505] md:left-1/2 md:-translate-x-1/2",
                      typeColors[item.type] ?? "bg-accent",
                    )}
                  />
                  <div
                    className={cn(
                      "ml-10 rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl md:ml-0",
                      left ? "md:col-start-1 md:mr-8" : "md:col-start-2 md:ml-8",
                    )}
                  >
                    <div className="flex flex-wrap items-center gap-2 md:justify-end">
                      <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.2em] text-white/45">
                        {item.type}
                      </span>
                      <span className="text-xs text-accent">{item.date}</span>
                    </div>
                    <h3 className="mt-3 font-display text-xl text-white">{item.title}</h3>
                    <p className="mt-1 text-sm text-white/50">{item.org}</p>
                    <p className="mt-3 text-sm leading-relaxed text-white/65">
                      {item.description}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
