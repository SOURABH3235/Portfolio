"use client";

import { Download, FileText } from "lucide-react";
import { siteConfig } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { motion } from "framer-motion";

export function ResumeSection() {
  return (
    <section id="resume" className="relative scroll-mt-28 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Resume"
          title="Review the full profile"
          description="View online or download a PDF copy for hiring conversations."
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <GlassCard className="flex flex-col items-start justify-between gap-8 overflow-hidden md:flex-row md:items-center">
            <div className="relative z-10">
              <p className="font-display text-2xl text-white md:text-3xl">
                Sourabh Rajput — Software Engineering Resume
              </p>
              <p className="mt-2 max-w-xl text-sm text-white/55">
                Includes skills, selected projects, education and certifications in a concise
                one-page format.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href={siteConfig.resume.viewUrl}>
                  <FileText size={16} /> View Resume
                </Button>
                <a
                  href={siteConfig.resume.downloadUrl}
                  download={siteConfig.resume.fileName}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-xl transition hover:bg-white/10"
                >
                  <Download size={16} /> Download Resume
                </a>
              </div>
            </div>
            <div className="relative h-40 w-full max-w-xs shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-accent/30 to-black p-5">
              <div className="h-full rounded-xl border border-white/10 bg-black/40 p-4">
                <div className="h-2 w-24 rounded bg-white/70" />
                <div className="mt-3 space-y-2">
                  <div className="h-1.5 w-full rounded bg-white/20" />
                  <div className="h-1.5 w-5/6 rounded bg-white/15" />
                  <div className="h-1.5 w-4/6 rounded bg-white/10" />
                  <div className="mt-4 h-1.5 w-full rounded bg-accent/50" />
                  <div className="h-1.5 w-3/4 rounded bg-white/15" />
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
