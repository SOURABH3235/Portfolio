export type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  features: string[];
  github: string;
  liveDemo: string | null;
  accent: string;
};

/**
 * Project content sourced from resume. Replace placeholder URLs when available.
 */
export const projects: Project[] = [
  {
    id: "vayudhara",
    name: "VayuDhara",
    tagline: "Carbon Credit Platform for Farmers",
    description:
      "A farmer-focused platform to explore potential income opportunities from carbon credits — combining calculators, smart recommendations and weather insights toward India Carbon Registry workflows.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "AI APIs", "Weather APIs"],
    features: [
      "Carbon Income Calculator for farmers",
      "Smart recommendations and guided workflows",
      "Weather insights integrated into decision support",
      "Concept path toward India Carbon Registry integration",
    ],
    github: "https://github.com/SOURABH3235/VayuDhara",
    liveDemo: null,
    accent: "#22c55e",
  },
  {
    id: "codesync",
    name: "CodeSync",
    tagline: "Collaborative Coding & Project Platform",
    description:
      "A responsive collaborative development platform with authenticated workflows, project management and dashboard functionality for secure team operations.",
    tech: [
      "React.js",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "Socket.io",
    ],
    features: [
      "Authenticated user workflows and project management",
      "Dashboard-driven collaboration experience",
      "REST API integration with JWT-based auth",
      "Realtime collaboration foundations with Socket.io",
    ],
    github: "https://github.com/SOURABH3235/CodeSync",
    liveDemo: null,
    accent: "#38bdf8",
  },
  {
    id: "agronova",
    name: "AgroNova",
    tagline: "Smart Agriculture Platform",
    description:
      "A responsive agriculture assistance platform focused on presenting useful farming information through a clean, modular interface.",
    tech: ["React.js", "HTML5", "CSS3", "Tailwind CSS", "JavaScript", "Python"],
    features: [
      "Modular farming information experience",
      "Responsive layouts and structured navigation",
      "User-friendly interface for agriculture assistance",
      "Modern frontend stack with Python support",
    ],
    github: "https://github.com/SOURABH3235/AgroNova",
    liveDemo: null,
    accent: "#a3e635",
  },
];
