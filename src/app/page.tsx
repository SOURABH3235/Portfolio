import { CinematicHero } from "@/components/sections/CinematicHero";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ResumeSection } from "@/components/sections/ResumeSection";
import { SocialSection } from "@/components/sections/SocialSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <CinematicHero />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <EducationSection />
      <ResumeSection />
      <SocialSection />
      <ContactSection />
    </>
  );
}
