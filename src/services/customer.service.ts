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
    const { data, error } =
      await customerRepository.move(
        customerId,
        pipelineStageId
      );

    if (error) {
      return failure(getErrorMessage(error));
    }

    return success(
      data,
      "Cliente movido com sucesso."
    );
  } catch (error) {
    return failure(getErrorMessage(error));
  }
}
}

export const customerService = new CustomerService();