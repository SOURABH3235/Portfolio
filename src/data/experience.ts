/**
 * Editable timeline entries.
 * Add new achievements here — they render automatically.
 * Keep descriptions factual; do not invent metrics.
 */

export type ExperienceItem = {
  id: string;
  date: string;
  title: string;
  org: string;
  type:
    | "certification"
    | "hackathon"
    | "project"
    | "event"
    | "achievement";
  description: string;
};

export const experienceItems: ExperienceItem[] = [
  {
    id: "programming-foundation",
    date: "2024",
    title: "Programming Foundation",
    org: "C++ • Java • OOP",
    type: "achievement",
    description:
      "Built a foundation in programming, object-oriented programming and problem-solving using C++ and Java.",
  },

  {
    id: "web-development",
    date: "2025",
    title: "Web Development",
    org: "HTML • CSS • JavaScript",
    type: "achievement",
    description:
      "Learned frontend development and built responsive web interfaces using HTML, CSS and JavaScript.",
  },

  {
    id: "java-dsa",
    date: "2025",
    title: "Java & Data Structures",
    org: "Core Java • DSA",
    type: "achievement",
    description:
      "Worked with Core Java and studied data structures and algorithms including arrays, linked lists, stacks, queues, searching and sorting.",
  },

  {
    id: "full-stack-development",
    date: "2025–2026",
    title: "Full Stack Development",
    org: "React • Spring Boot  • MongoDB",
    type: "achievement",
    description:
      "Expanded into full stack development with React, Tailwind CSS, Spring Boot, MongoDB and JWT authentication.",
  },

  
  {
    id: "advanced-development",
    date: "2026",
    title: "Advanced Development",
    org: " • TypeScript • Spring Boot • Docker • AWS",
    type: "achievement",
    description:
      "  TypeScript and Spring Boot while learning containerization with Docker and cloud deployment using AWS.",

  },

  {
    id: "vayudhara",
    date: "Ongoing",
    title: "VayuDhara — Carbon Credit Platform",
    org: "Personal / Academic Project",
    type: "project",
    description:
      "Building a farmer-focused carbon credit platform with carbon income calculation, smart suggestions and AI-assisted workflows.",
  },

  {
    id: "codesync",
    date: "Ongoing",
    title: "CodeSync — Collaborative Platform",
    org: "Personal / Academic Project",
    type: "project",
    description:
      "Developing collaborative coding workflows with authentication, REST APIs, JWT and Socket.io.",
  },

  {
    id: "antarikshai",
    date: "2026",
    title: "AntarikshAI — SatQuery AI",
    org: "SIH 2026 • Space Technology",
    type: "hackathon",
    description:
      "Working on an AI assistant for interactive analysis of multimodal satellite imagery using vision-language and RAG-based workflows.",
  },
];