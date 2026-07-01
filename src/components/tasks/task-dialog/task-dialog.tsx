"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Task } from "@/src/types/task/task";
import { taskService } from "@/src/services/task.service";

import {
  Sheet,
  SheetContent,
} from "@/src/components/ui/sheet";

import { TaskForm } from "./task-form";

import {
  toUTC,
  fromUTC,
} from "@/src/utils/date";

type Props = {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reload: () => void;
};

export function TaskDialog({
  task,
  open,
  onOpenChange,
  reload,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    customer_id: "",
    priority: "medium",
    due_date: "",
  });

  useEffect(() => {
    if (!task) {
      setForm({
        title: "",
        description: "",
        customer_id: "",
        priority: "medium",
        due_date: "",
      });

      return;
    }

    setForm({
      title: task.title,
      description: task.description ?? "",
      customer_id: task.customer_id ?? "",
      priority: task.priority,
      due_date: task.due_date
        ? fromUTC(task.due_date)
        : "",
    });
  }, [task]);

  async function handleSave() {
    setLoading(true);

    const payload = {
      ...form,
      customer_id: form.customer_id || null,
      due_date: form.due_date
        ? toUTC(form.due_date)
        : null,
    };

    const result = task
      ? await taskService.update(task.id, payload)
      : await taskService.create(payload);

    setLoading(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);

    reload();
    onOpenChange(false);
  }

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetContent
        side="right"
        className="
          w-full
          sm:max-w-[520px]
          md:max-w-[560px]
          lg:max-w-[620px]
          p-0
          overflow-hidden
        "
      >
        <TaskForm
          editing={!!task}
          loading={loading}
          form={form}
          setForm={setForm}
          onSave={handleSave}
          onCancel={() => onOpenChange(false)}
        />

        
      </SheetContent>
    </Sheet>
  );
}