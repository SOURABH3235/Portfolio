"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { siteConfig } from "@/data/site";
import { useConnect } from "@/providers/ConnectProvider";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { setOpen } = useConnect();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.6, duration: 0.7 }}
        className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
      >
        <nav
          className={cn(
            "flex w-full max-w-4xl items-center justify-between gap-4 rounded-full border px-3 py-2 pl-4 backdrop-blur-2xl transition-all duration-500",
            scrolled
              ? "border-white/15 bg-black/70 shadow-[0_10px_40px_rgba(0,0,0,0.45)]"
              : "border-white/10 bg-white/[0.04]",
          )}
        >
          <a href="#home" className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
              SR
            </span>
            <span className="hidden font-display text-sm font-semibold tracking-wide text-white sm:inline">
              Sourabh R.
            </span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {siteConfig.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-1.5 text-xs font-medium text-white/65 transition hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white shadow-[0_0_24px_rgba(255,45,45,0.35)] transition hover:bg-accent-bright"
            >
              Contact
            </button>
            <button
              type="button"
              className="rounded-full border border-white/10 p-2 text-white md:hidden"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={16} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-xl md:hidden"
          >
            <div className="flex items-center justify-between px-5 py-5">
              <span className="font-display text-lg text-white">Menu</span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="rounded-full border border-white/15 p-2 text-white"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex flex-col gap-2 px-5">
              {siteConfig.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-lg text-white"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
