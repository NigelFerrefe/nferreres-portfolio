"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCertification } from "@/hooks/useCertification";
import { CertificationForm } from "./CertificationForm";

const CertificationSection = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingCertificationId, setEditingCertificationId] = useState<string | null>(null);

  const {
    certification,
    isLoading,
    createCertification,
    updateCertification,
    deleteCertification,
  } = useCertification();

  const editingCert= certification.find((cer) => cer.id === editingCertificationId);

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Cargando...</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setEditingCertificationId(null);
            setIsCreateOpen(true);
          }}
        >
          Añadir
        </Button>
      </div>

      {isCreateOpen && (
        <div className="rounded-xl border border-border bg-background p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold">Nueva experiencia laboral</h3>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsCreateOpen(false)}
            >
              Cerrar
            </Button>
          </div>

          <CertificationForm
            onSubmit={async (values) => {
              await createCertification(values);
              setIsCreateOpen(false);
            }}
          />
        </div>
      )}

      {editingCert && (
        <div className="rounded-xl border border-border bg-background p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold">Editar Certificado</h3>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setEditingCertificationId(null)}
            >
              Cerrar
            </Button>
          </div>

           <CertificationForm
            submitLabel="Actualizar Certificado"
            defaultValues={{
              title: editingCert.title,
              issuer: editingCert.issuer,
              issue_date: editingCert.issue_date,
              description_es: editingCert.description_es,
              description_en: editingCert.description_en,
              
           
            }}
            onSubmit={async (values) => {
              await updateCertification({
                id: editingCert.id,
                ...values,
              });

              setEditingCertificationId(null);
            }}
          /> 
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-border">
        <div className="grid grid-cols-4 bg-muted px-4 py-3 text-sm font-medium">
          <span>Trabajo</span>
          <span>Empresa</span>
          <span className="text-center">Editar</span>
          <span className="text-center">Eliminar</span>
        </div>

        {certification.map((cert) => (
          <div
            key={cert.id}
            className="grid grid-cols-4 items-center border-t border-border px-4 py-3 text-sm"
          >
            <span className="font-medium">{cert.title}</span>
            <span className="text-muted-foreground">{cert.issuer}</span>

            <div className="flex justify-center">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setIsCreateOpen(false);
                  setEditingCertificationId(cert.id);
                }}
              >
                Editar
              </Button>
            </div>

            <div className="flex justify-center">
              <Button
                size="sm"
                variant="destructive"
                onClick={async () => {
                  const confirmed = window.confirm(
                    `¿Eliminar "${cert.title}"? Esta acción no se puede deshacer.`,
                  );

                  if (!confirmed) return;

                  await deleteCertification(cert.id);

                  if (editingCertificationId === cert.id) {
                    setEditingCertificationId(null);
                  }
                }}
              >
                Eliminar
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificationSection;