"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { useConnect } from "@/providers/ConnectProvider";

const HeroScene = dynamic(
  () =>
    import("@/components/three/HeroScene").then(
      (m) => m.HeroScene
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-[#050505]" />
    ),
  }
);

gsap.registerPlugin(useGSAP);

/* =========================================
   HEAD MOVEMENT
   ========================================= */

function HeadMovement() {
  const [frame, setFrame] = useState(1);

  const targetFrame = useRef(1);
  const currentFrame = useRef(1);

  /* -----------------------------------------
     CURSOR → FRAME
  ----------------------------------------- */

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;

      // Cursor left  -> frame 1
      // Cursor right -> frame 72
      const newFrame = Math.round(x * 71) + 1;

      targetFrame.current = Math.max(
        1,
        Math.min(72, newFrame)
      );
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
    };
  }, []);

  /* -----------------------------------------
     SMOOTH FRAME MOVEMENT
  ----------------------------------------- */

  useEffect(() => {
    let animationFrame: number;

    const animate = () => {
      const current = currentFrame.current;
      const target = targetFrame.current;

      if (Math.abs(current - target) > 0.05) {
        currentFrame.current +=
          (target - current) * 0.15;

        setFrame(
          Math.round(currentFrame.current)
        );
      }

      animationFrame =
        requestAnimationFrame(animate);
    };

    animate();

    return () =>
      cancelAnimationFrame(animationFrame);
  }, []);

  /* -----------------------------------------
     FRAME NAME
     frame_0001.png
     frame_0002.png
     ...
     frame_0072.png
  ----------------------------------------- */

 const frameNumber = String(frame).padStart(4, "0");

return (
  <div
    className="
      pointer-events-none
      absolute
      inset-0
      z-[2]
      flex
      items-center
      justify-center

      md:justify-end
      md:pr-[6%]
    "
  >
    {/* HEAD MOVEMENT */}
    <img
      src={`/head_movement_frames_12fps/frame_${frameNumber}.png`}
      alt="Sourabh"
      draggable={false}
      className="
        pointer-events-none
        h-[55%]
        w-auto
        object-contain

        md:h-[65%]
      "
    />

    {/* BLACK CIRCLE */}
    <div
      className="
        pointer-events-none
        absolute
        right-[8.6%]
        bottom-[21%]
        z-[3]
        flex
        h-9
        w-9
        items-center
        justify-center
        rounded-full
        bg-black/87
        shadow-[0_0_12px_rgba(0,0,0,0.8)]
      "
    />
  </div>
);
}

/* =========================================
   CINEMATIC HERO
   ========================================= */

export function CinematicHero() {
  const { setOpen } = useConnect();

  const [progress, setProgress] = useState(0);
  const [introDone, setIntroDone] = useState(false);
  const [showUI, setShowUI] = useState(false);

  /* -----------------------------------------
     INTRO ANIMATION
  ----------------------------------------- */

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

      onUpdate: () => {
        setProgress(obj.value);
      },
    });
  }, []);

  /* -----------------------------------------
     SCROLL PROGRESS
  ----------------------------------------- */

  useEffect(() => {
    const onScroll = () => {
      if (!introDone) return;

      const max = Math.min(
        window.innerHeight * 0.85,
        700
      );

      const p = Math.min(
        1,
        window.scrollY / max
      );

      setProgress(
        0.72 + p * 0.28
      );
    };

    window.addEventListener(
      "scroll",
      onScroll,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        onScroll
      );
    };
  }, [introDone]);

  return (
    <section
      id="home"
      className="
        relative
        flex
        min-h-[100svh]
        items-end
        justify-center
        overflow-hidden
        pb-16
        pt-28

        md:items-center
        md:justify-start
        md:pb-24
      "
    >

      {/* =====================================
          BACKGROUND / THREE SCENE
      ===================================== */}

      <div className="absolute inset-0 z-0">

        {/* HEAD MOVEMENT */}

        {showUI && <HeadMovement />}

        {/* DARK GRADIENT */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-[3]
            bg-gradient-to-t
            from-[#050505]
            via-[#050505]/35
            to-transparent
          "
        />

        {/* RADIAL DARK EFFECT */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-[3]
            bg-[radial-gradient(
              ellipse_at_center,
              transparent_20%,
              rgba(5,5,5,0.75)_85%
            )]
          "
        />

      </div>

      {/* =====================================
          LOADING SCREEN
      ===================================== */}

      <AnimatePresence>
        {!showUI ? (
          <motion.div
            key="loader"
            initial={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
              scale: 1.04,
              filter: "blur(10px)",
            }}
            transition={{
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              pointer-events-none
              absolute
              inset-0
              z-20
              flex
              p-6

              md:p-16
            "
          >

            {/* LOADING VIDEO */}

            <div
              className="
                absolute
                inset-0
                flex
                items-center
                justify-center
                px-4
                pb-20

                md:px-10
                md:pb-0
              "
            >

              <div
                className="
                  absolute
                  h-[min(55vw,540px)]
                  w-[min(92vw,1000px)]
                  bg-[radial-gradient(
                    ellipse_at_center,
                    rgba(255,45,45,0.16),
                    transparent_70%
                  )]
                  blur-3xl
                "
              />

              <motion.video
                src="/Video%20Project%204.mp4"
                autoPlay
                muted
                playsInline
                preload="auto"
                aria-hidden="true"

                initial={{
                  opacity: 0,
                  scale: 0.95,
                }}

                animate={{
                  opacity:
                    0.88 -
                    progress * 0.2,

                  scale:
                    0.97 +
                    progress * 0.03,
                }}

                transition={{
                  duration: 0.14,
                  ease: "linear",
                }}

                className="
                  relative
                  h-auto
                  max-h-[64svh]
                  w-auto
                  max-w-[92vw]
                  object-contain
                "

                style={{
                  maskImage:
                    "radial-gradient(ellipse at center, black 48%, transparent 100%)",

                  WebkitMaskImage:
                    "radial-gradient(ellipse at center, black 48%, transparent 100%)",
                }}
              />

            </div>

            {/* LOADING PROGRESS */}

            <div
              className="
                relative
                mt-auto
                flex
                w-full
                items-end
                gap-6

                md:gap-10
              "
            >

              <div className="mb-2 flex-1">

                <p
                  className="
                    mb-3
                    font-display
                    text-[10px]
                    uppercase
                    tracking-[0.35em]
                    text-white/60

                    md:text-xs
                  "
                >
                  Entering Portfolio
                </p>

                <div
                  className="
                    h-px
                    w-full
                    overflow-hidden
                    bg-white/20
                  "
                  role="progressbar"
                  aria-label="Portfolio loading progress"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={
                    Math.round(
                      progress * 100
                    )
                  }
                >

                  <div
                    className="
                      h-full
                      bg-accent
                      shadow-[0_0_12px_rgba(255,45,45,0.7)]
                    "
                    style={{
                      width: `${
                        progress * 100
                      }%`,
                    }}
                  />

                </div>

              </div>

              <p
                className="
                  shrink-0
                  font-display
                  text-5xl
                  font-light
                  tracking-tight
                  text-white/90

                  md:text-7xl
                "
              >
                {Math.round(
                  progress * 100
                )}
                %
              </p>

            </div>

          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* =====================================
          HERO TEXT
      ===================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          w-full
          max-w-7xl
          justify-center
          px-5
          text-center

          md:block
          md:px-8
          md:text-left
        "
      >

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}

          animate={
            showUI
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {
                  opacity: 0,
                  y: 40,
                }
          }

          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}

          className="
            mx-auto
            max-w-3xl
            text-center

            md:mx-0
            md:text-left
          "
        >

          <p
            className="
              mb-4
              font-display
              text-xs
              uppercase
              tracking-[0.4em]
              text-accent
            "
          >
            Developer Portfolio
          </p>

          <h1
            className="
              font-display
              text-5xl
              font-semibold
              leading-[0.95]
              tracking-tight
              text-white

              sm:text-6xl
              md:text-7xl
              lg:text-8xl
            "
          >
            {siteConfig.displayName}
          </h1>

          <p
            className="
              mt-5
              max-w-xl
              text-base
              text-white/65

              md:text-lg
            "
          >
            {siteConfig.subtitle}
          </p>

          <div
            className="
              mt-8
              flex
              flex-wrap
              gap-3
            "
          >

            <Button href="#projects">
              View Projects
            </Button>

            <Button
              variant="glass"
              onClick={() =>
                setOpen(true)
              }
            >
              Let&apos;s Connect
            </Button>

          </div>

        </motion.div>

      </div>

    </section>
  );
}