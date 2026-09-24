/**
 * Contact & social links — edit here to update the entire site.
 * Chat send currently opens mailto / WhatsApp. Swap `sendVia` later for a real API.
 */
export const contactConfig = {
  email: "rajputsourabh273@gmail.com",
  phone: "+917805930901",
  phoneDisplay: "+91 78059 30901",
  whatsapp: "917805930901",
  location: "Bhopal, Madhya Pradesh, India",
  socials: [
    {
      id: "github",
      label: "GitHub",
      href: "https://github.com/SOURABH3235",
      handle: "SOURABH3235",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/sourabh-rajput",
      handle: "sourabh-rajput",
    },
    {
      id: "email",
      label: "Email",
      href: "mailto:rajputsourabh273@gmail.com",
      handle: "rajputsourabh273@gmail.com",
    },
  ],
  chat: {
    greeting:
      "Hey — I'm Sourabh. Tell me what you're looking for and I'll get back soon.",
    quickOptions: [
      {
        id: "hiring",
        label: "Internship / Hiring",
        message:
          "Hi Sourabh, I came across your portfolio and would like to discuss an internship / hiring opportunity with you.",
      },
      {
        id: "collaboration",
        label: "Collaboration",
        message:
          "Hi Sourabh, I'd love to collaborate on a project. Looking forward to connecting.",
      },
      {
        id: "project",
        label: "Project Discussion",
        message:
          "Hi Sourabh, I have a project idea I'd like to discuss with you. Are you available for a quick conversation?",
      },
      {
        id: "hi",
        label: "Just want to say Hi 👋",
        message: "Hi Sourabh! Just wanted to say hello and check out your work.",
      },
    ],
    defaultMessage:
      "Hi Sourabh, I visited your portfolio and would like to connect regarding...",
    defaultSubject: "Hello from your portfolio — let's connect",
  },
} as const;

export type ChatOptionId = (typeof contactConfig.chat.quickOptions)[number]["id"];
