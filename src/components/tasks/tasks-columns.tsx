"use client";

import {
  AlertCircle,
  Calendar,
  CheckCircle2,
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
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const pending = tasks.filter(
    (task) => task.status === "pending"
  );

  const completed = tasks.filter(
    (task) => task.status === "completed"
  );

  const overdue = pending.filter((task) => {
    if (!task.due_date) return false;

    const due = new Date(task.due_date);

    due.setHours(0, 0, 0, 0);

    return due < today;
  });

  const todayTasks = pending.filter((task) => {
    if (!task.due_date) return false;

    const due = new Date(task.due_date);

    due.setHours(0, 0, 0, 0);

    return due.getTime() === today.getTime();
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
        title="Concluídas"
        icon={
          <CheckCircle2 className="text-green-600" />
        }
        tasks={completed}
        onComplete={onComplete}
        onOpen={onOpen}
      />

    </div>
  );
}