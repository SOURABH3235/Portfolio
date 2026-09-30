"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  GitBranch,
  Link2,
  Mail,
  MessageCircle,
  Send,
  X,
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { contactConfig } from "@/data/contact";
import { useConnect } from "@/providers/ConnectProvider";
import {
  buildMailto,
  buildWhatsAppLink,
  sendPortfolioMessage,
} from "@/lib/contact-links";
import { cn } from "@/lib/utils";

export function ConnectFab() {
  const { open, setOpen, toggle } = useConnect();

  return (
    <>
      <motion.button
        type="button"
        onClick={toggle}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 3, type: "spring", stiffness: 220, damping: 18 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        className={cn(
          "fixed bottom-6 right-5 z-[70] inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_40px_rgba(255,45,45,0.45)] md:bottom-8 md:right-8",
          open ? "bg-white/10 backdrop-blur-xl border border-white/20" : "bg-accent",
        )}
        aria-expanded={open}
        aria-controls="connect-panel"
      >
        {open ? <X size={16} /> : <MessageCircle size={16} />}
        Let&apos;s Connect
      </motion.button>

      <AnimatePresence>
        {open ? (
          <ConnectPanel onClose={() => setOpen(false)} />
        ) : null}
      </AnimatePresence>
    </>
  );
}

function ConnectPanel({ onClose }: { onClose: () => void }) {
  const [activeOption, setActiveOption] = useState<string | null>(null);
  const [message, setMessage] = useState<string>(contactConfig.chat.defaultMessage);

  const subject = useMemo(() => {
    const option = contactConfig.chat.quickOptions.find((o) => o.id === activeOption);
    if (!option) return contactConfig.chat.defaultSubject;
    return `${option.label} — portfolio inquiry`;
  }, [activeOption]);

  return (
    <>
      <motion.button
        type="button"
        aria-label="Close connect panel backdrop"
        className="fixed inset-0 z-[65] bg-black/55 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.aside
        id="connect-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Let's Connect"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 28, scale: 0.96 }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
        className="fixed bottom-24 right-4 z-[75] w-[min(100vw-2rem,420px)] overflow-hidden rounded-[1.75rem] border border-white/15 bg-white/[0.07] shadow-[0_30px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl md:right-8"
      >
        <div className="border-b border-white/10 bg-gradient-to-r from-accent/25 to-transparent px-5 py-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-display text-lg text-white">Let&apos;s Connect</p>
              <p className="mt-1 text-sm text-white/60">{contactConfig.chat.greeting}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/15 p-2 text-white/70 hover:text-white"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="space-y-4 p-5">
          <div>
            <p className="mb-2 text-[11px] uppercase tracking-[0.25em] text-white/40">
              Quick options
            </p>
            <div className="flex flex-wrap gap-2">
              {contactConfig.chat.quickOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    setActiveOption(option.id);
                    setMessage(option.message);
                  }}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs transition",
                    activeOption === option.id
                      ? "border-accent bg-accent text-white"
                      : "border-white/12 bg-white/[0.03] text-white/75 hover:border-white/25",
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="connect-message" className="sr-only">
              Message
            </label>
            <textarea
              id="connect-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className="w-full resize-none rounded-2xl border border-white/12 bg-black/35 px-4 py-3 text-sm text-white outline-none ring-accent/40 placeholder:text-white/30 focus:ring-2"
              placeholder="Write your message..."
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() =>
                sendPortfolioMessage({ subject, message, channel: "email" })
              }
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-semibold text-white"
            >
              <Send size={15} /> Send Message
            </button>
            <a
              href={buildWhatsAppLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-4 py-3 text-sm text-white hover:bg-white/5"
            >
              WhatsApp
            </a>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <DirectLink
              href={buildMailto(subject, message)}
              icon={<Mail size={14} />}
              label="Email"
            />
            <DirectLink
              href={buildWhatsAppLink(message)}
              icon={<MessageCircle size={14} />}
              label="WhatsApp"
              external
            />
            <DirectLink
              href={contactConfig.socials.find((s) => s.id === "linkedin")!.href}
              icon={<Link2 size={14} />}
              label="LinkedIn"
              external
            />
            <DirectLink
              href={contactConfig.socials.find((s) => s.id === "github")!.href}
              icon={<GitBranch size={14} />}
              label="GitHub"
              external
            />
          </div>
          
        </div>
      </motion.aside>
    </>
  );
}

function DirectLink({
  href,
  icon,
  label,
  external,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-xs text-white/70 transition hover:border-white/25 hover:text-white"
    >
      {icon}
      {label}
    </a>
  );
}
