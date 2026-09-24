/**
 * Editable timeline entries. Add new achievements here — they render automatically.
 * Keep descriptions factual; do not invent metrics.
 */
export type ExperienceItem = {
  id: string;
  date: string;
  title: string;
  org: string;
  type: "certification" | "hackathon" | "project" | "event" | "achievement";
  description: string;
};

export const experienceItems: ExperienceItem[] = [
  {
    id: "jpmorgan-forage",
    date: "2025",
    title: "Software Engineering Job Simulation",
    org: "JPMorgan Chase & Co. (Forage)",
    type: "certification",
    description:
      "Completed a guided software engineering job simulation focused on practical engineering workflows.",
  },
  {
    id: "kaggle-python",
    date: "2025",
    title: "Python Code Badge",
    org: "Kaggle",
    type: "achievement",
    description:
      "Earned the Kaggle Python Code Badge demonstrating applied Python proficiency.",
  },
  {
    id: "cisco-network",
    date: "2024–2025",
    title: "Network Fundamentals & Routing Certifications",
    org: "Cisco Networking Academy",
    type: "certification",
    description:
      "Completed Cisco Networking Academy certifications covering network fundamentals and routing concepts.",
  },
  {
    id: "vayudhara-build",
    date: "Ongoing",
    title: "VayuDhara — Carbon Credit Platform",
    org: "Personal / Academic Project",
    type: "project",
    description:
      "Building a farmer-focused carbon credit exploration platform with AI and weather-assisted workflows.",
  },
  {
    id: "codesync-build",
    date: "Ongoing",
    title: "CodeSync — Collaborative Platform",
    org: "Personal / Academic Project",
    type: "project",
    description:
      "Developing authenticated collaborative coding workflows with REST APIs, JWT and Socket.io.",
  },
];
