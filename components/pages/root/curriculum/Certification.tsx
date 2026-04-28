import { Certification } from "@/types/cv";
import { formatDateTime } from "@/lib/utils/index";

interface CertificationSectionProps {
  certifications: Certification[];
  isEs: boolean;
}

const CertificationSection = ({ certifications, isEs }: CertificationSectionProps) => {
  return (
    <section className="w-full py-10" id="certificaciones">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6 ml-3">
        {isEs ? "Certificaciones" : "Certifications"}
      </h2>
      <ol className="relative border-l border-border ml-3" aria-label={isEs ? "Lista de certificaciones" : "Certifications list"}>
        {certifications.map((cert) => (
          <li key={cert.id} className="mb-10 ml-6">
            <span aria-hidden="true" className="absolute -left-[7px] flex h-3 w-3 rounded-full bg-primary ring-2 ring-background" />
            {cert.issue_date && (
              <p className="text-xs font-medium text-muted-foreground mb-1">
                <time dateTime={cert.issue_date}>{formatDateTime(cert.issue_date).dateMonthYear}</time>
              </p>
            )}
            <h3 className="text-base font-semibold text-foreground">{cert.title}</h3>
            <p className="text-sm text-muted-foreground mb-2">{cert.issuer}</p>
            <p className="text-sm text-muted-foreground">
              {isEs ? cert.description_es : cert.description_en}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default CertificationSection;