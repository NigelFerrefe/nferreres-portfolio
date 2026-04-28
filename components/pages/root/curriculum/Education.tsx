import { Education } from "@/types/cv";
import { formatDateTime } from "@/lib/utils/index";

interface EducationSectionProps {
  education: Education[];
  isEs: boolean;
}

const EducationSection = ({ education, isEs }: EducationSectionProps) => {
  return (
    <section className="w-full py-10" id="educacion">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6 ml-3">
        {isEs ? "Educación" : "Education"}
      </h2>
      <ol className="relative border-l border-border ml-3" aria-label={isEs ? "Lista de educación" : "Education list"}>
        {education.map((edu) => (
          <li key={edu.id} className="mb-10 ml-6">
            <span aria-hidden="true" className="absolute -left-[7px] flex h-3 w-3 rounded-full bg-primary ring-2 ring-background" />
            <p className="text-xs font-medium text-muted-foreground mb-1">
              <time dateTime={edu.start_date}>{formatDateTime(edu.start_date).dateMonthYear}</time>
              {edu.end_date && (
                <> — <time dateTime={edu.end_date}>{formatDateTime(edu.end_date).dateMonthYear}</time></>
              )}
            </p>
            <h3 className="text-base font-semibold text-foreground">
              {isEs ? edu.title_es : edu.title_en}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              {edu.institution}
              <span aria-hidden="true"> · </span>
              <span className="sr-only">, </span>
              {edu.location}
            </p>
            <p className="text-sm text-muted-foreground">
              {isEs ? edu.description_es : edu.description_en}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default EducationSection;