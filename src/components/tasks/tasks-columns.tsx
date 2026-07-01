"use client";

import {
  AlertCircle,
  Calendar,
  Clock3,
} from "lucide-react";

import { Task } from "@/src/types/task/task";

import { TaskList } from "./task-list";

type Props = {
  tasks: Task[];
  onComplete: (id: string) => void;
  onOpen?: (task: Task) => void;
};

export function TasksColumns({
  tasks,
  onComplete,
  onOpen,
}: Props) {
  const todayString =
    new Date().toISOString().split("T")[0];

  const overdue = tasks.filter((task) => {
    if (!task.due_date) return false;

    return (
      task.due_date.split("T")[0] <
      todayString
    );
  });

  const todayTasks = tasks.filter((task) => {
    if (!task.due_date) return false;

    return (
      task.due_date.split("T")[0] ===
      todayString
    );
  });

  const upcoming = tasks.filter((task) => {
    if (!task.due_date) return true;

    return (
      task.due_date.split("T")[0] >
      todayString
    );
  });

  return (
    <div className="grid gap-6 lg:grid-cols-3">

      <TaskList
        title="Atrasadas"
        icon={
          <AlertCircle className="text-red-500" />
        }
        tasks={overdue}
        onComplete={onComplete}
        onOpen={onOpen}
      />

      <TaskList
        title="Hoje"
        icon={
          <Calendar className="text-amber-500" />
        }
        tasks={todayTasks}
        onComplete={onComplete}
        onOpen={onOpen}
      />

      <TaskList
        title="Próximas"
        icon={
          <Clock3 className="text-blue-600" />
        }
        tasks={upcoming}
        onComplete={onComplete}
        onOpen={onOpen}
      />

    </div>
  );
}