"use client";

import { ReactNode } from "react";

import { Task } from "@/src/types/task/task";

import { TaskCard } from "./task-card";

type Props = {
  title: string;
  icon: ReactNode;
  tasks: Task[];
  onComplete: (id: string) => void;
  onOpen?: (task: Task) => void;
};

export function TaskList({
  title,
  icon,
  tasks,
  onComplete,
  onOpen,
}: Props) {
  return (
    <div className="flex flex-col rounded-2xl border bg-card shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between border-b p-5">

        <div className="flex items-center gap-2">

          {icon}

          <h2 className="text-lg font-semibold">
            {title}
          </h2>

        </div>

        <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
          {tasks.length}
        </span>

      </div>

      {/* Lista */}

      <div className="flex flex-col gap-4 p-4">

        {tasks.length === 0 ? (
          <div className="rounded-xl border border-dashed py-10 text-center text-sm text-muted-foreground">
            Nenhuma tarefa.
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={onComplete}
              onOpen={onOpen}
            />
          ))
        )}

      </div>

    </div>
  );
}