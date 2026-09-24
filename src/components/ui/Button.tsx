"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Shared = {
  variant?: "primary" | "ghost" | "glass";
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = Shared &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = Shared & {
  href: string;
  onClick?: never;
};

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonAsButton | ButtonAsLink) {
  const styles = cn(
    "relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    variant === "primary" &&
      "bg-accent text-white shadow-[0_0_32px_rgba(255,45,45,0.35)] hover:bg-accent-bright hover:shadow-[0_0_40px_rgba(255,45,45,0.5)]",
    variant === "ghost" &&
      "border border-white/15 bg-transparent text-white/90 hover:border-white/35 hover:bg-white/5",
    variant === "glass" &&
      "border border-white/12 bg-white/6 text-white backdrop-blur-xl hover:bg-white/10",
    className,
  );

  if ("href" in props && props.href) {
    return (
      <motion.a
        href={props.href}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={styles}
        target={props.href.startsWith("http") ? "_blank" : undefined}
        rel={props.href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </motion.a>
    );
  }

  const buttonProps = props as ButtonAsButton;

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={styles}
      type={buttonProps.type ?? "button"}
      onClick={buttonProps.onClick}
      disabled={buttonProps.disabled}
    >
      {children}
    </motion.button>
  );
}
