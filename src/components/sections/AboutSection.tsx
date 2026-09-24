"use client";

import dynamic from "next/dynamic";
import { siteConfig } from "@/data/site";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { motion } from "framer-motion";

const AboutVisual = dynamic(
  () => import("@/components/three/AboutVisual").then((m) => m.AboutVisual),
  { ssr: false },
);

export function AboutSection() {
  return (
    <section id="about" className="relative scroll-mt-28 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-2 md:items-center md:px-8">
        <div>
          <SectionHeading
            eyebrow="About Me"
            title="Building reliable software with an AI-native mindset"
            description={siteConfig.summary}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <GlassCard>
              <p className="text-xs uppercase tracking-[0.25em] text-accent">Education</p>
              <p className="mt-3 font-display text-xl text-white">
                {siteConfig.educationShort}
              </p>
              <p className="mt-2 text-sm text-white/50">{siteConfig.location}</p>
            </GlassCard>
            <GlassCard>
              <p className="text-xs uppercase tracking-[0.25em] text-accent">Role</p>
              <p className="mt-3 font-display text-xl text-white">{siteConfig.role}</p>
              <p className="mt-2 text-sm text-white/50">Open to internships & collaboration</p>
            </GlassCard>
          </div>
          <div className="mt-8 space-y-6">
            <div>
              <h3 className="font-display text-lg text-white">Current focus</h3>
              <ul className="mt-3 space-y-2">
                {siteConfig.currentFocus.map((item) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex gap-3 text-sm text-white/65"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-lg text-white">Developer interests</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {siteConfig.interests.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/70"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <AboutVisual />
      </div>
    </section>
  );
}
