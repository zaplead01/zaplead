import { PageHeader } from "@/src/components/page-header";
import { PipelineLayout } from "@/src/components/pipeline/pipeline-layout";

export default function PipelinePage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Pipeline"
        description="Gerencie seus clientes por etapa da negociação."
      />

      <PipelineLayout />
    </div>
  );
}