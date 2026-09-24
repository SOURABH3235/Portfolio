"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function SkillsSection() {
  return (
    <section id="skills" className="relative scroll-mt-28 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Skills"
          title="Tools I shape experiences with"
          description="Interactive skill set spanning full-stack engineering and AI/ML — hover to feel the depth."
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.04, duration: 0.5 }}
              whileHover={{ y: -8, rotateX: 8, rotateY: -6, scale: 1.03 }}
              style={{ transformStyle: "preserve-3d", perspective: 800 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-4 shadow-[0_20px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl"
            >
              <div
                className="absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-30 blur-2xl transition group-hover:opacity-70"
                style={{ background: skill.accent }}
              />
              <div
                className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-sm font-bold"
                style={{ color: skill.accent, background: `${skill.accent}22` }}
              >
                {skill.name.slice(0, 2).toUpperCase()}
              </div>
              <p className="font-display text-sm font-semibold text-white">{skill.name}</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/35">
                {skill.category}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
