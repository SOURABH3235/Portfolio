import { contactConfig } from "@/data/contact";
import { siteConfig } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/40">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <p className="font-display text-lg text-white">{siteConfig.name}</p>
          <p className="mt-1 text-sm text-white/45">{siteConfig.subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-4">
          {contactConfig.socials.map((s) => (
            <a
              key={s.id}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/55 transition hover:text-accent"
            >
              {s.label}
            </a>
          ))}
        </div>
        <p className="text-xs text-white/35">
          © {new Date().getFullYear()} {siteConfig.name}. Crafted with cinematic intent.
        </p>
      </div>
    </footer>
  );
}
