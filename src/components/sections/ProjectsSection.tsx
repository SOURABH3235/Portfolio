"use client";

import { motion } from "framer-motion";
import { ExternalLink, GitBranch } from "lucide-react";
import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";

export function ProjectsSection() {
  return (
    <section id="projects" className="relative scroll-mt-28 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work with real problem spaces"
          description="Premium interactive cards for VayuDhara, CodeSync and AgroNova — content stays editable via data constants."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <GlassCard className="relative h-full overflow-hidden p-0">
                <div
                  className="h-28 w-full opacity-80"
                  style={{
                    background: `linear-gradient(135deg, ${project.accent}55, transparent 70%), radial-gradient(circle at 80% 20%, ${project.accent}33, transparent 50%)`,
                  }}
                />
                <div className="space-y-4 p-6 pt-0 -mt-8">
                  <div className="rounded-2xl border border-white/10 bg-black/50 p-4 backdrop-blur-xl">
                    <p className="text-xs uppercase tracking-[0.25em] text-white/45">
                      {project.tagline}
                    </p>
                    <h3 className="mt-2 font-display text-2xl text-white">{project.name}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-white/60">{project.description}</p>
                  <div>
                    <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/35">
                      Tech stack
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-white/70"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/35">
                      Key features
                    </p>
                    <ul className="space-y-1.5">
                      {project.features.map((f) => (
                        <li key={f} className="flex gap-2 text-sm text-white/60">
                          <span
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ background: project.accent }}
                          />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/5"
                    >
                      <GitBranch size={14} /> GitHub
                    </a>
                    {project.liveDemo ? (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white"
                      >
                        <ExternalLink size={14} /> Live Demo
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-white/15 px-4 py-2 text-xs text-white/35">
                        Live demo soon
                      </span>
                    )}
                  </div>
                </div>
              </GlassCard>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
