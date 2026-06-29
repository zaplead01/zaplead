"use client";

import { useCallback, useEffect, useState } from "react";

import { Task } from "@/src/types/task/task";

import { taskService } from "@/src/services/task.service";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);

    const result = await taskService.list();

    if (!result.success) {
      console.error(result.message);
      setTasks([]);
      setLoading(false);
      return;
    }

    setTasks(result.data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return {
    tasks,
    loading,
    reload: load,
  };
}