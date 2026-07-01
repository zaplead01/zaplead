import { taskRepository } from "@/src/repositories/task.repository";
import { dashboardRepository } from "@/src/repositories/dashboard.repository";
import { authService } from "./auth.service";

import { success, failure } from "@/src/lib/result";
import { getErrorMessage } from "@/src/utils/get-error-message";
import { Errors } from "@/src/constants/errors";
import { Messages } from "@/src/constants/messages";

import { supabase } from "@/src/lib/supabase/client";

import { Task } from "@/src/types/task/task";

class TaskService {
  async list() {
    try {
      const {
        data: { user },
      } = await authService.me();

      if (!user) {
        return failure(Errors.USER_NOT_FOUND);
      }

      const { data: membership } =
        await dashboardRepository.getMembership(user.id);

      if (!membership) {
        return failure(
          Errors.ORGANIZATION_NOT_FOUND
        );
      }

      const { data, error } =
        await taskRepository.list(
          membership.organization_id
        );

      if (error) {
        return failure(getErrorMessage(error));
      }

      return success(data ?? []);
    } catch (error) {
      return failure(getErrorMessage(error));
    }
  }

  async create(
    task: Omit<
      Task,
      | "id"
      | "organization_id"
      | "created_at"
      | "updated_at"
    >
  ) {
    try {
      const {
        data: { user },
      } = await authService.me();

      if (!user) {
        return failure(Errors.USER_NOT_FOUND);
      }

      const { data: membership } =
        await dashboardRepository.getMembership(user.id);

      if (!membership) {
        return failure(
          Errors.ORGANIZATION_NOT_FOUND
        );
      }
console.log("USER", user.id);

console.log("MEMBERSHIP", membership);

console.log("TASK", {
  ...task,
  organization_id: membership.organization_id,
  assigned_to: user.id,
});

const {
  data: { session },
} = await supabase.auth.getSession();

console.log("SESSION", session);


      const { data, error } =
      
  await taskRepository.create({
    ...task,
    organization_id:
      membership.organization_id,
    assigned_to: user.id,
  });

      if (error) {
        return failure(getErrorMessage(error));
      }

      return success(
        data,
        Messages.CREATED ?? "Tarefa criada."
      );
    } catch (error) {
      return failure(getErrorMessage(error));
    }
  }

  async update(
    id: string,
    task: Partial<Task>
  ) {
    try {
      const { data, error } =
        await taskRepository.update(
          id,
          task
        );

      if (error) {
        return failure(getErrorMessage(error));
      }

      return success(
        data,
        Messages.UPDATED ??
          "Tarefa atualizada."
      );
    } catch (error) {
      return failure(getErrorMessage(error));
    }
  }

  async complete(id: string) {
    try {
      const { data, error } =
        await taskRepository.complete(id);

      if (error) {
        return failure(getErrorMessage(error));
      }

      return success(
        data,
        "Tarefa concluída."
      );
    } catch (error) {
      return failure(getErrorMessage(error));
    }
  }

  async delete(id: string) {
    try {
      const { error } =
        await taskRepository.delete(id);

      if (error) {
        return failure(getErrorMessage(error));
      }

      return success(
        undefined,
        "Tarefa removida."
      );
    } catch (error) {
      return failure(getErrorMessage(error));
    }
  }
}

export const taskService =
  new TaskService();