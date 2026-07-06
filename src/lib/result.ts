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

export function failure<T = never>(
  message: string,
  code?: string
): ServiceResponse<T> {
  return {
    success: false,
    message,
    code,
  };
}