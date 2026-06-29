import { AppShell } from "@/src/components/app-shell";
import { TasksContent } from "@/src/components/tasks/tasks-content";

export default function TasksPage() {
  return (
    <AppShell>
      <TasksContent />
    </AppShell>
  );
}