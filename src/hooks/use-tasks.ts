"use client";

import { useCallback, useEffect, useState } from "react";

import { Task } from "@/src/types/task/task";
import { taskService } from "@/src/services/task.service";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    console.log("1 - Iniciando load");

    setLoading(true);

    const result = await taskService.list();

    console.log("2 - Resultado:", result);

    if (!result.success) {
      console.error(result.message);
      setTasks([]);
      setLoading(false);
      return;
    }

    console.log("3 - Atualizando tasks");

    setTasks(result.data ?? []);

    setLoading(false);

    console.log("4 - Finalizou");
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