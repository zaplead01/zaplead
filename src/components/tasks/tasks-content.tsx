"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Task } from "@/src/types/task/task";

import { useTasks } from "@/src/hooks/use-tasks";
import { taskService } from "@/src/services/task.service";

import { TaskDialog } from "./task-dialog/task-dialog";
import { TasksHeader } from "./tasks-header";
import { TasksColumns } from "./tasks-columns";
import { CompletedTasksDialog } from "./completed-tasks-dialog";

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

  const [completedOpen, setCompletedOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");

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

  const filteredTasks = useMemo(() => {
    if (!search.trim()) return tasks;

    const value = search.toLowerCase();

    return tasks.filter((task) => {
      return (
        task.title.toLowerCase().includes(value) ||
        task.description
          ?.toLowerCase()
          .includes(value) ||
        task.customer?.full_name
          ?.toLowerCase()
          .includes(value)
      );
    });
  }, [tasks, search]);

  const pending =
    filteredTasks.filter(
      (task) => task.status === "pending"
    );

  const completed =
    filteredTasks.filter(
      (task) => task.status === "completed"
    );

  const todayString =
    new Date().toISOString().split("T")[0];

  const overdue =
    pending.filter((task) => {
      if (!task.due_date) return false;

      return (
        task.due_date.split("T")[0] <
        todayString
      );
    });

  const todayTasks =
    pending.filter((task) => {
      if (!task.due_date) return false;

      return (
        task.due_date.split("T")[0] ===
        todayString
      );
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
  search={search}
  onSearchChange={setSearch}
  onNewTask={handleNewTask}
  onCompletedClick={() => setCompletedOpen(true)}
/>

      <TasksColumns
        tasks={pending}
        onComplete={handleComplete}
        onOpen={handleOpen}
      />

      <CompletedTasksDialog
        open={completedOpen}
        onOpenChange={setCompletedOpen}
        tasks={completed}
        onOpen={handleOpen}
      />

      <TaskDialog
        task={selectedTask}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        reload={reload}
      />

    </div>
  );
}