"use client";

import {
  CalendarDays,
  CircleCheckBig,
  Clock3,
  Plus,
  Search,
  TriangleAlert,
} from "lucide-react";

import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";

type Props = {
  total: number;
  pending: number;
  today: number;
  overdue: number;
  completed: number;

  onNewTask: () => void;
};

export function TasksHeader({
  total,
  pending,
  today,
  overdue,
  completed,
  onNewTask,
}: Props) {
  return (
    <div className="space-y-8">

      {/* HEADER */}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-3xl font-bold tracking-tight">
            Tarefas
          </h1>

          <p className="mt-2 text-muted-foreground">
            Organize follow-ups, compromissos e atividades da equipe.
          </p>

        </div>

        <Button
          size="lg"
          onClick={onNewTask}
        >
          <Plus className="mr-2 h-4 w-4" />
          Nova tarefa
        </Button>

      </div>

      {/* KPIs */}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">

        <Card className="p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-muted-foreground">
                Total
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {total}
              </h2>

            </div>

            <CalendarDays
              className="text-primary"
              size={28}
            />

          </div>

        </Card>

        <Card className="p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-muted-foreground">
                Pendentes
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {pending}
              </h2>

            </div>

            <Clock3
              className="text-amber-500"
              size={28}
            />

          </div>

        </Card>

        <Card className="p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-muted-foreground">
                Hoje
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {today}
              </h2>

            </div>

            <CalendarDays
              className="text-blue-600"
              size={28}
            />

          </div>

        </Card>

        <Card className="p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-muted-foreground">
                Atrasadas
              </p>

              <h2 className="mt-2 text-3xl font-bold text-red-600">
                {overdue}
              </h2>

            </div>

            <TriangleAlert
              className="text-red-600"
              size={28}
            />

          </div>

        </Card>

        <Card className="p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-muted-foreground">
                Concluídas
              </p>

              <h2 className="mt-2 text-3xl font-bold text-green-600">
                {completed}
              </h2>

            </div>

            <CircleCheckBig
              className="text-green-600"
              size={28}
            />

          </div>

        </Card>

      </div>

      {/* BUSCA */}

      <div className="flex flex-col gap-4 lg:flex-row">

        <div className="relative flex-1">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />

          <Input
            placeholder="Buscar tarefas..."
            className="pl-10"
          />

        </div>

      </div>

    </div>
  );
}