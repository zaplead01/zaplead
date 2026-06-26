"use client";

import { Card, CardContent } from "@/src/components/ui/card";

import { PipelineStage as PipelineStageType } from "@/src/types/pipeline/pipeline-stage";

import { usePipelineCustomers } from "@/src/hooks/use-pipeline-customers";

import { CustomerCard } from "./customer-card";

import { Skeleton } from "@/src/components/ui/skeleton";

type Props = {
  stage: PipelineStageType;
};

export function PipelineStage({
  stage,
}: Props) {
  const {
    customers,
    loading,
  } = usePipelineCustomers(stage.id);
  

  return (
    <Card>
      <CardContent className="space-y-4 p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">
            {stage.name}
          </h3>

          <span className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
            {customers.length}
          </span>
        </div>

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