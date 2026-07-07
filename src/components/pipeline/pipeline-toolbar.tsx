"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import { CreatePipelineDialog } from "./dialog/create-pipeline-dialog";

export function PipelineToolbar() {
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Pipeline
          </h2>

          <p className="text-sm text-muted-foreground">
            Selecione ou crie um pipeline.
          </p>
        </div>

        <Button
          onClick={() => setCreateOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Novo Pipeline
        </Button>
      </div>

      <CreatePipelineDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
      />
    </>
  );
}