import SectionHeader from "@/components/SectionHeader";
import {
  getCertification,
  getEducation,
  getSkills,
  getWorkExperience,
} from "@/lib/services/cv";
import { Locale } from "@/types/localeProps";
import WorkExperienceSection from "./Work";
import EducationSection from "./Education";
import CertificationSection from "./Certification";
import { SkillWithCategory } from "@/types/cv";
import SkillsSection from "./Skills";
import TimelineDouble from "./TimeLineDouble";
import ScrollToTopButton from "@/components/ScrollToTop";


const CurriculumPage = async ({ locale }: { locale: Locale }) => {
  const workExperience = await getWorkExperience();
  const education = await getEducation();
  const certifications = await getCertification();
  const skills = await getSkills();
  const isEs = locale === "es";

  const skillsByCategory = skills.reduce(
    (acc, skill) => {
      const cat = skill.skill_categories.name;
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(skill);
      return acc;
    },
    {} as Record<string, SkillWithCategory[]>,
  );

  const anchors = [
    { href: "#experiencia", label: isEs ? "Experiencia" : "Experience" },
    { href: "#educacion", label: isEs ? "Educación" : "Education" },
    {
      href: "#certificaciones",
      label: isEs ? "Certificaciones" : "Certifications",
    },
    { href: "#skills", label: "Skills" },
  ];

  //const skillsDistributionData = getSkillsDistributionData(skillsByCategory);

  return (
    <div className="flex flex-col items-center pt-4 px-4 md:px-6">
      <SectionHeader chapter="I" label={isEs ? "CURRICULUM" : "RESUME"} />
      <nav className="my-8 flex justify-center w-full gap-2 md:hidden ">
        {anchors.map((anchor) => (
          <a
            key={anchor.href}
            href={anchor.href}
            className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors duration-150"
          >
            {anchor.label}
          </a>
        ))}
      </nav>
      <div className="md:hidden w-full">
        <WorkExperienceSection workExperience={workExperience} isEs={isEs} />
        <EducationSection education={education} isEs={isEs} />
        <CertificationSection certifications={certifications} isEs={isEs} />
      </div>
      <TimelineDouble
        workExperience={workExperience}
        education={education}
        certifications={certifications}
        isEs={isEs}
      />
      <SkillsSection skillsByCategory={skillsByCategory} isEs={isEs} />
      <ScrollToTopButton />
    </div>
  );
};

export default CurriculumPage;
