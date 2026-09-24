"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { useConnect } from "@/providers/ConnectProvider";

const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((m) => m.HeroScene),
  { ssr: false, loading: () => <div className="h-full w-full bg-[#050505]" /> },
);

gsap.registerPlugin(useGSAP);

export function CinematicHero() {
  const { setOpen } = useConnect();
  const [progress, setProgress] = useState(0);
  const [introDone, setIntroDone] = useState(false);
  const [showUI, setShowUI] = useState(false);

  useGSAP(() => {
    const obj = { value: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        setIntroDone(true);
        setShowUI(true);
      },
    });
    tl.to(obj, {
      value: 1,
      duration: 2.8,
      ease: "power2.inOut",
      onUpdate: () => setProgress(obj.value),
    });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!introDone) return;
      const max = Math.min(window.innerHeight * 0.85, 700);
      const p = Math.min(1, window.scrollY / max);
      setProgress(0.72 + p * 0.28);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [introDone]);

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-end overflow-hidden pb-16 pt-28 md:items-center md:pb-24"
    >
      <div className="absolute inset-0 z-0">
        <HeroScene progress={progress} introDone={introDone} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/35 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(5,5,5,0.75)_85%)]" />
      </div>

      <AnimatePresence>
        {!showUI ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute inset-0 z-20 flex items-end justify-end p-8 md:p-16"
          >
            <p className="font-display text-5xl font-light tracking-tight text-white/90 md:text-7xl">
              {Math.round(progress * 100)}%
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={showUI ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="mb-4 font-display text-xs uppercase tracking-[0.4em] text-accent">
            Developer Portfolio
          </p>
          <h1 className="font-display text-5xl font-semibold leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
            {siteConfig.displayName}
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/65 md:text-lg">
            {siteConfig.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#projects">View Projects</Button>
            <Button variant="glass" onClick={() => setOpen(true)}>
              Let&apos;s Connect
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
