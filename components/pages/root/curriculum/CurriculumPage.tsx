import { getWorkExperience } from "@/lib/services/cv";
import { Locale } from "@/types/localeProps";

const CurriculumPage = async ({ locale }: { locale: Locale }) => {
  const WorkExperience = await getWorkExperience();

  return (
    <div className="flex flex-col items-center pt-4 px-4">
      <h2 className="text-primary font-display text-2xl  "> I · Resume</h2>
      <section className="py-10">
        {WorkExperience.map((work) => (
          <div key={work.id}>{work.company}</div>
        ))}
      </section>
    </div>
  );
};
export default CurriculumPage;
