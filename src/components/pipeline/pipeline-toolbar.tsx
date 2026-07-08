"use client";

import { useState } from "react";

import {
  ChevronDown,
  Plus,
  MoreVertical,
} from "lucide-react";

import { Button } from "@/src/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

import { CreatePipelineDialog } from "./dialog/create-pipeline-dialog";

export function PipelineToolbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="
          flex
          items-center
          justify-between
          rounded-2xl
          border
          bg-card
          px-6
          py-3
        "
      >
        <div>
          <button
            className="
              flex
              items-center
              gap-2
              text-base
              font-semibold
            "
          >
            Vendas

            <ChevronDown className="h-4 w-4" />
          </button>

        
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={() => setOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Pipeline
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                Editar Pipeline
              </DropdownMenuItem>

              <DropdownMenuItem>
                Excluir Pipeline
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <CreatePipelineDialog
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}