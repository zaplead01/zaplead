"use client";

import { PipelineStage } from "@/src/types/pipeline/pipeline-stage";

import { useDroppable } from "@dnd-kit/core";

import { usePipelineCustomers } from "@/src/hooks/use-pipeline-customers";
import { CustomerCard } from "./customer-card";
import { Skeleton } from "@/src/components/ui/skeleton";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

type Props = {
  stage: PipelineStage;
};

export function KanbanColumn({
  stage,
}: Props) {
    const {
  customers,
  loading,
} = usePipelineCustomers(stage.id);
const { setNodeRef, isOver } = useDroppable({
  id: stage.id,
});
  return (
    <Card
  ref={setNodeRef}
  className={`w-80 shrink-0 transition-colors ${
    isOver
      ? "border-primary bg-primary/5"
      : ""
  }`}
>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">
            {stage.name}
          </CardTitle>

         <span className="rounded-full bg-muted px-2 py-1 text-xs">
  {customers.length}
</span>
        </div>
      </CardHeader>

    <CardContent className="space-y-3 min-h-[500px]">
  {loading ? (
    <>
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
    </>
  ) : customers.length === 0 ? (
    <p className="text-center text-sm text-muted-foreground">
      Nenhum cliente
    </p>
  ) : (
    customers.map((customer) => (
      <CustomerCard
        key={customer.id}
        customer={customer}
      />
    ))
  )}
</CardContent>
    </Card>
  );
}