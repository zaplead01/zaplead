import { Errors } from "@/src/constants/errors";

export function getErrorMessage(error: unknown): string {
  if (
    error &&
    typeof error === "object" &&
    "message" in error
  ) {
    const message = String(error.message);

    if (
      message.includes("Invalid login credentials")
    ) {
      return Errors.INVALID_LOGIN;
    }

    if (
      message.includes("User already registered")
    ) {
      return "Este e-mail já está cadastrado.";
    }

    return message;
  }

  return Errors.UNKNOWN;
}