"use client";

import {
  createContext,
  useContext,
  ReactNode,
} from "react";

import { useKanban } from "@/src/hooks/use-kanban";

const PipelineContext =
  createContext<ReturnType<typeof useKanban> | null>(
    null
  );

type Props = {
  children: ReactNode;
};

export function PipelineProvider({
  children,
}: Props) {
  const kanban = useKanban();

  return (
    <PipelineContext.Provider value={kanban}>
      {children}
    </PipelineContext.Provider>
  );
}

export function usePipelineContext() {
  const context = useContext(PipelineContext);

  if (!context) {
    throw new Error(
      "usePipelineContext deve ser usado dentro de PipelineProvider."
    );
  }

  return context;
}