export type Skill = {
  id: string;
  name: string;
  category: "language" | "frontend" | "backend" | "database" | "ai" | "tools";
  accent: string;
};

export const skills: Skill[] = [
  { id: "java", name: "Java", category: "language", accent: "#f97316" },
  { id: "spring", name: "Spring Boot", category: "backend", accent: "#22c55e" },
  { id: "js", name: "JavaScript", category: "language", accent: "#eab308" },
  { id: "ts", name: "TypeScript", category: "language", accent: "#3b82f6" },
  { id: "react", name: "React", category: "frontend", accent: "#06b6d4" },
  { id: "next", name: "Next.js", category: "frontend", accent: "#a3a3a3" },
  { id: "node", name: "Node.js", category: "backend", accent: "#84cc16" },
  { id: "express", name: "Express.js", category: "backend", accent: "#94a3b8" },
  { id: "mongo", name: "MongoDB", category: "database", accent: "#22c55e" },
  { id: "mysql", name: "MySQL", category: "database", accent: "#38bdf8" },
  { id: "tailwind", name: "Tailwind CSS", category: "frontend", accent: "#14b8a6" },
  { id: "python", name: "Python", category: "language", accent: "#eab308" },
  { id: "aiml", name: "AI/ML", category: "ai", accent: "#ef4444" },
  { id: "git", name: "Git/GitHub", category: "tools", accent: "#f87171" },
];
