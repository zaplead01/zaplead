import { customerRepository } from "@/src/repositories/customer.repository";
import { dashboardRepository } from "@/src/repositories/dashboard.repository";
import { pipelineRepository } from "@/src/repositories/pipeline.repository";

import { authService } from "./auth.service";

import { customerActivityService } from "./customer-activity.service";

import { Customer } from "@/src/types/customer/customer";
import { success, failure } from "@/src/lib/result";
import { Messages } from "@/src/constants/messages";
import { Errors } from "@/src/constants/errors";
import { getErrorMessage } from "@/src/utils/get-error-message";

class CustomerService {
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
        return failure(Errors.ORGANIZATION_NOT_FOUND);
      }

      const { data, error } =
        await customerRepository.list(
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
    customer: Omit<
      Customer,
      "id" | "created_at" | "updated_at" | "organization_id"
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
        return failure(Errors.ORGANIZATION_NOT_FOUND);
      }

      const { data: pipeline } =
        await pipelineRepository.getDefault(
          membership.organization_id
        );

      if (!pipeline) {
        return failure("Pipeline padrão não encontrado.");
      }

      const { data: stage } =
        await pipelineRepository.getFirstStage(
          pipeline.id
        );

      if (!stage) {
        return failure("Primeira etapa não encontrada.");
      }

      const { data, error } =
        await customerRepository.create({
          ...customer,
          organization_id: membership.organization_id,
          pipeline_id: pipeline.id,
          pipeline_stage_id: stage.id,
        });

      if (error) {
        return failure(getErrorMessage(error));
      }

await customerActivityService.create({
  customer_id: data.id,
  type: "created",
  title: "Cliente criado",
  description: "Cliente cadastrado no CRM.",
  metadata: {},
});

      return success(
        data,
        Messages.CUSTOMER_CREATED
      );
    } catch (error) {
      return failure(getErrorMessage(error));
    }
  }

  async getById(id: string) {
    try {
      const { data, error } =
        await customerRepository.getById(id);

      if (error) {
        return failure(getErrorMessage(error));
      }

      if (!data) {
        return failure(Errors.CUSTOMER_NOT_FOUND);
      }

      return success(data);
    } catch (error) {
      return failure(getErrorMessage(error));
    }
  }

  async update(
    id: string,
    customer: Partial<Customer>
  ) {
    try {
      const { data, error } =
        await customerRepository.update(
          id,
          customer
        );
        
      if (error) {
        return failure(getErrorMessage(error));
      }
const activityResult =
      await customerActivityService.create({
  customer_id: id,
  type: "updated",
  title: "Cliente atualizado",
  description: "Os dados do cliente foram alterados.",
  metadata: customer,
});

if (customer.next_follow_up_at)  {
  await customerActivityService.create({
    customer_id: id,
    type: "follow_up",
    title: "Follow-up agendado",
    description: `Próximo contato para ${new Date(
      customer.next_follow_up_at
    ).toLocaleString("pt-BR")}`,
    metadata: {
      next_follow_up_at: customer.next_follow_up_at,
    },
  });
}

console.log("ACTIVITY RESULT", activityResult);
      return success(
        data,
        Messages.CUSTOMER_UPDATED
      );
    } catch (error) {
      return failure(getErrorMessage(error));
    }
  }

  async delete(id: string) {
    try {
      const { error } =
        await customerRepository.delete(id);

      if (error) {
        return failure(getErrorMessage(error));
      }
      return success(
        undefined,
        Messages.CUSTOMER_DELETED
      );
    } catch (error) {
      return failure(getErrorMessage(error));
    }
  }

async move(
  customerId: string,
  pipelineStageId: string
) {
  try {

    const customerResult =
      await customerRepository.getById(customerId);

    if (!customerResult.data) {
      return failure(Errors.CUSTOMER_NOT_FOUND);
    }

    const customer = customerResult.data;

    const previousStage =
      await pipelineRepository.getStageById(
        customer.pipeline_stage_id
      );

    const newStage =
      await pipelineRepository.getStageById(
        pipelineStageId
      );

    const { data, error } =
      await customerRepository.move(
        customerId,
        pipelineStageId
      );

    if (error) {
      return failure(getErrorMessage(error));
    }

        await customerActivityService.create({
      customer_id: customerId,
      type: "stage_changed",
      title: "Etapa alterada",
      description: `De "${previousStage.data?.name}" para "${newStage.data?.name}"`,
      metadata: {
        from: previousStage.data?.id,
        to: newStage.data?.id,
      },
    });
    return success(
  data,
  "Cliente movido com sucesso."
);
  } catch (error) {
    return failure(getErrorMessage(error));
  }
}
async listFollowUps() {
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
      return failure(Errors.ORGANIZATION_NOT_FOUND);
    }

    const today = new Date();

    const todayStart = new Date(today);
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date(today);
    todayEnd.setHours(23, 59, 59, 999);

    const tomorrowStart = new Date(todayStart);
    tomorrowStart.setDate(tomorrowStart.getDate() + 1);

    const tomorrowEnd = new Date(todayEnd);
    tomorrowEnd.setDate(tomorrowEnd.getDate() + 1);

    const overdue =
      await customerRepository.listOverdue(
        membership.organization_id
      );

    const todayCustomers =
      await customerRepository.listToday(
        membership.organization_id,
        todayStart.toISOString(),
        todayEnd.toISOString()
      );

    const tomorrowCustomers =
      await customerRepository.listTomorrow(
        membership.organization_id,
        tomorrowStart.toISOString(),
        tomorrowEnd.toISOString()
      );

      
    return success({
      overdue: overdue.data ?? [],
      today: todayCustomers.data ?? [],
      tomorrow: tomorrowCustomers.data ?? [],
    });
  } catch (error) {
    return failure(getErrorMessage(error));
  }
}

async completeFollowUp(customerId: string) {
  try {
    const { data, error } =
      await customerRepository.completeFollowUp(customerId);

    if (error) {
      return failure(getErrorMessage(error));
    }

    await customerActivityService.create({
      customer_id: customerId,
      type: "follow_up_completed",
      title: "Follow-up realizado",
      description: "Contato realizado com sucesso.",
      metadata: {},
    });

    return success(
      data,
      "Follow-up concluído com sucesso."
    );
  } catch (error) {
    return failure(getErrorMessage(error));
  }
}

async listSimple() {
  const result = await this.list();

  if (!result.success) {
    return result;
  }

  return success(
    result.data.map(customer => ({
      id: customer.id,
      full_name: customer.full_name,
      company: customer.company,
    }))
  );
}

}
export const customerService = new CustomerService();



