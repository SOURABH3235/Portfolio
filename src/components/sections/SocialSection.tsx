"use client";

import { motion } from "framer-motion";
import { GitBranch, Link2, Mail } from "lucide-react";
import { contactConfig } from "@/data/contact";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons = {
  github: GitBranch,
  linkedin: Link2,
  email: Mail,
} as const;

export function SocialSection() {
  return (
    <section id="social" className="relative scroll-mt-28 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Social"
          title="Find me online"
          description="Animated profile links for GitHub, LinkedIn and email."
          align="center"
          className="mb-10"
        />
        <div className="flex flex-wrap items-center justify-center gap-4">
          {contactConfig.socials.map((social, i) => {
            const Icon = icons[social.id as keyof typeof icons] ?? Mail;
            return (
              <motion.a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6, scale: 1.04 }}
                className="group flex min-w-[180px] items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur-xl"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent transition group-hover:bg-accent group-hover:text-white">
                  <Icon size={18} />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-white">{social.label}</span>
                  <span className="block text-xs text-white/45">{social.handle}</span>
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
