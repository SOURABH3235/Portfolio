"use client";

import dynamic from "next/dynamic";
import { GitBranch, Link2, MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";
import { contactConfig } from "@/data/contact";
import { Button } from "@/components/ui/Button";
import { useConnect } from "@/providers/ConnectProvider";
import { motion } from "framer-motion";

const ContactScene = dynamic(
  () => import("@/components/three/ContactScene").then((m) => m.ContactScene),
  { ssr: false },
);

export function ContactSection() {
  const { setOpen } = useConnect();

  return (
    <section
      id="contact"
      className="relative scroll-mt-28 overflow-hidden py-28 md:py-36"
    >
      <ContactScene />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,45,45,0.18),transparent_55%)]" />
      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center md:px-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 font-display text-xs uppercase tracking-[0.4em] text-accent"
        >
          Contact
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl font-semibold tracking-tight text-white md:text-6xl lg:text-7xl"
        >
          Let&apos;s{" "}
          <span className="text-accent">build</span> something amazing together.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto mt-5 max-w-xl text-white/55"
        >
          {siteConfig.tagline} Open for internships, collaborations and project discussions.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Button onClick={() => setOpen(true)}>
            <MessageCircle size={16} /> Start a Conversation
          </Button>
          <Button
            variant="ghost"
            href={contactConfig.socials.find((s) => s.id === "github")?.href}
          >
            <GitBranch size={16} /> View GitHub
          </Button>
          <Button
            variant="glass"
            href={contactConfig.socials.find((s) => s.id === "linkedin")?.href}
          >
            <Link2 size={16} /> Connect on LinkedIn
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
