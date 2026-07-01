"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/src/components/ui/sheet";

import { CheckCircle2 } from "lucide-react";

import { Task } from "@/src/types/task/task";

import { TaskList } from "./task-list";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tasks: Task[];
  onOpen?: (task: Task) => void;
};

export function CompletedTasksDialog({
  open,
  onOpenChange,
  tasks,
  onOpen,
}: Props) {
  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
      <SheetContent
        side="right"
        className="w-full sm:max-w-2xl overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            Tarefas concluídas
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6">
          <TaskList
            title={`Concluídas (${tasks.length})`}
            icon={
              <CheckCircle2 className="text-green-600" />
            }
            tasks={tasks}
            onComplete={() => {}}
            onOpen={onOpen}
            hideCompleteButton
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}