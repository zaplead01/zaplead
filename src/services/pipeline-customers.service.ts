import { pipelineCustomersRepository } from "@/src/repositories/pipeline-customers.repository";

import { success, failure } from "@/src/lib/result";
import { getErrorMessage } from "@/src/utils/get-error-message";

class PipelineCustomersService {
  async list(stageId: string) {
    try {
      const { data, error } =
        await pipelineCustomersRepository.list(stageId);

      if (error) {
        return failure(getErrorMessage(error));
      }

      return success(data ?? []);
    } catch (error) {
      return failure(getErrorMessage(error));
    }
  }
}

export const pipelineCustomersService =
  new PipelineCustomersService();