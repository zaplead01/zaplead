import { ServiceResponse } from "@/src/types/responses/service-response";

export function success<T>(
  data?: T,
  message = "Operação realizada com sucesso."
): ServiceResponse<T> {
  return {
    success: true,
    message,
    data,
  };
}

export function failure(
  message: string
): ServiceResponse {
  return {
    success: false,
    message,
  };
}