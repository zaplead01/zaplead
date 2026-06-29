import { supabase } from "@/src/lib/supabase/client";
import { Task } from "@/src/types/task/task";

class TaskRepository {
  async list(organizationId: string) {
    return await supabase
      .from("tasks")
      .select(`
        *,
        customer:customers(
          id,
          full_name,
          company
        )
      `)
      .eq("organization_id", organizationId)
      .order("due_date");
  }

  async create(task: Omit<Task, "id" | "created_at" | "updated_at">) {
  console.log("ENVIANDO TASK:", task);

  const response = await supabase
    .from("tasks")
    .insert(task)
    .select()
    .single();

  console.log("RESPOSTA:", response);

  return response;
}

  async update(
    id: string,
    task: Partial<Task>
  ) {
    return await supabase
      .from("tasks")
      .update(task)
      .eq("id", id)
      .select()
      .single();
  }

  async complete(id: string) {
    return await supabase
      .from("tasks")
      .update({
        status: "completed",
        completed_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();
  }

  async delete(id: string) {
    return await supabase
      .from("tasks")
      .delete()
      .eq("id", id);
  }
}

export const taskRepository =
  new TaskRepository();