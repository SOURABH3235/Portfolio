"use client";

import { motion } from "framer-motion";
import { education } from "@/data/education";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { GraduationCap } from "lucide-react";

export function EducationSection() {
  return (
    <section id="education" className="relative scroll-mt-28 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Education"
          title="Academic foundation"
          description="Interactive education card with coursework and program highlights."
        />
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <GlassCard className="overflow-hidden p-0 md:grid md:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-5 p-7 md:p-10">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15 text-accent">
                <GraduationCap />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-accent">
                  {education.shortDegree}
                </p>
                <h3 className="mt-2 font-display text-3xl text-white md:text-4xl">
                  {education.degree}
                </h3>
                <p className="mt-3 text-white/60">{education.institution}</p>
                <p className="text-sm text-white/40">{education.location}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/70">
                  Expected {education.expectedGraduation}
                </span>
                <span className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/70">
                  {education.semester}
                </span>
              </div>
              <ul className="space-y-2">
                {education.highlights.map((h) => (
                  <li key={h} className="flex gap-2 text-sm text-white/60">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-white/10 bg-gradient-to-br from-accent/15 via-transparent to-transparent p-7 md:border-l md:border-t-0 md:p-10">
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                Relevant coursework
              </p>
              <div className="mt-5 space-y-3">
                {education.coursework.map((course, i) => (
                  <motion.div
                    key={course}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/80"
                  >
                    {course}
                  </motion.div>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
