import { contactConfig } from "@/data/contact";

export function buildMailto(subject: string, body: string) {
  const params = new URLSearchParams({
    subject,
    body,
  });
  return `mailto:${contactConfig.email}?${params.toString()}`;
}

export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${contactConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}

/**
 * First-version send: opens mailto. Replace with fetch('/api/contact') later.
 */
export function sendPortfolioMessage(opts: {
  subject?: string;
  message: string;
  channel?: "email" | "whatsapp";
}) {
  const subject = opts.subject ?? contactConfig.chat.defaultSubject;
  if (opts.channel === "whatsapp") {
    window.open(buildWhatsAppLink(opts.message), "_blank", "noopener,noreferrer");
    return;
  }
  window.location.href = buildMailto(subject, opts.message);
}
