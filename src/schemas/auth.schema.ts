import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Informe um e-mail válido."),

  password: z
    .string()
    .min(6, "A senha deve possuir pelo menos 6 caracteres."),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Informe seu nome completo."),

  business: z
    .string()
    .trim()
    .min(2, "Informe o nome do seu negócio."),

  phone: z
    .string()
    .trim()
    .min(10, "Informe um WhatsApp válido."),

  email: z
    .string()
    .trim()
    .email("Informe um e-mail válido."),

  password: z
    .string()
    .min(8, "A senha deve possuir pelo menos 8 caracteres."),
});

export type RegisterFormData = z.infer<typeof registerSchema>;