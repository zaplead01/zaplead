import { PageHeader } from "@/src/components/page-header";
import { PipelineToolbar } from "@/src/components/pipeline/pipeline-toolbar";
import { PipelineBoard } from "@/src/components/pipeline/pipeline-board";

export default function PipelinePage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Pipeline"
        description="Gerencie seus clientes por etapa da negociação."
      />

      <PipelineToolbar />

      <PipelineBoard />
    </div>
  );
}