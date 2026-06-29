"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Task } from "@/src/types/task/task";

import { useTasks } from "@/src/hooks/use-tasks";
import { taskService } from "@/src/services/task.service";

import { TasksHeader } from "./tasks-header";
import { TasksColumns } from "./tasks-columns";

export function TasksContent() {
  const {
    tasks,
    loading,
    reload,
  } = useTasks();

  const [selectedTask, setSelectedTask] =
    useState<Task | null>(null);

  const [dialogOpen, setDialogOpen] =
    useState(false);

  async function handleComplete(id: string) {
    const result =
      await taskService.complete(id);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);

    reload();
  }

  function handleOpen(task: Task) {
    setSelectedTask(task);
    setDialogOpen(true);
  }

  function handleNewTask() {
    setSelectedTask(null);
    setDialogOpen(true);
  }

  const pending =
    tasks.filter(
      task => task.status === "pending"
    );

  const completed =
    tasks.filter(
      task => task.status === "completed"
    );

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const overdue =
    pending.filter(task => {
      if (!task.due_date) return false;

      const due = new Date(task.due_date);

      due.setHours(0, 0, 0, 0);

      return due < today;
    });

  const todayTasks =
    pending.filter(task => {
      if (!task.due_date) return false;

      const due = new Date(task.due_date);

      due.setHours(0, 0, 0, 0);

      return due.getTime() === today.getTime();
    });

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        Carregando tarefas...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <TasksHeader
        total={tasks.length}
        pending={pending.length}
        today={todayTasks.length}
        overdue={overdue.length}
        completed={completed.length}
        onNewTask={handleNewTask}
      />

      <TasksColumns
        tasks={tasks}
        onComplete={handleComplete}
        onOpen={handleOpen}
      />

      {/*
        Próximo passo:
        <TaskDialog
          task={selectedTask}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          reload={reload}
        />
      */}

    </div>
  );
}