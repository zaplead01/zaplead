"use client";

import {
  Calendar,
  CheckCircle2,
  Clock3,
  DollarSign,
  FolderOpen,
} from "lucide-react";

import { Task } from "@/src/types/task/task";

import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";

type Props = {
  task: Task;
  onComplete: (id: string) => void;
  onOpen?: (task: Task) => void;
};

export function TaskCard({
  task,
  onComplete,
  onOpen,
}: Props) {
  function priorityBadge() {
    switch (task.priority) {
      case "high":
        return (
          <Badge variant="destructive">
            Alta
          </Badge>
        );

      case "medium":
        return (
          <Badge className="bg-amber-500 hover:bg-amber-600">
            Média
          </Badge>
        );

      case "low":
        return (
          <Badge className="bg-blue-600 hover:bg-blue-700">
            Baixa
          </Badge>
        );

      default:
        return (
          <Badge variant="secondary">
            Normal
          </Badge>
        );
    }
  }

  function formatDate(date: string | null) {
    if (!date) return "Sem prazo";

    return new Date(date).toLocaleString(
      "pt-BR",
      {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  }

  return (
    <Card className="transition-all hover:-translate-y-1 hover:shadow-lg">

      <div className="space-y-5 p-5">

        <div className="flex items-center justify-between">

          {priorityBadge()}

          <Calendar
            size={18}
            className="text-muted-foreground"
          />

        </div>

        <div>

          <h3 className="font-semibold text-base">
            {task.title}
          </h3>

          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {task.description || "Sem descrição"}
          </p>

        </div>

        <div className="space-y-3 text-sm">

          <div className="flex items-center gap-2">

            <Clock3
              size={15}
              className="text-muted-foreground"
            />

            <span>
              {formatDate(task.due_date)}
            </span>

          </div>

          {task.customer && (
            <div className="flex items-center gap-2">

              <FolderOpen
                size={15}
                className="text-muted-foreground"
              />

              <span>
                {task.customer.full_name}
              </span>

            </div>
          )}

          {task.customer?.estimated_value && (
            <div className="flex items-center gap-2">

              <DollarSign
                size={15}
                className="text-muted-foreground"
              />

              <span>
                {task.customer.estimated_value.toLocaleString(
                  "pt-BR",
                  {
                    style: "currency",
                    currency: "BRL",
                  }
                )}
              </span>

            </div>
          )}

        </div>

        <div className="flex gap-2">

          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onOpen?.(task)}
          >
            <FolderOpen className="mr-2 h-4 w-4" />
            Abrir
          </Button>

          <Button
            onClick={() => onComplete(task.id)}
            className="bg-green-600 hover:bg-green-700"
          >
            <CheckCircle2 className="h-4 w-4" />
          </Button>

        </div>

      </div>

    </Card>
  );
}