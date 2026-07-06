export type ServiceResponse<T = unknown> = {
  success: boolean;
  message: string;
  data?: T;
  code?: string;
};