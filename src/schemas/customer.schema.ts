import { z } from "zod";

export const customerSchema = z.object({
  full_name: z
    .string()
    .min(3, "Informe o nome do cliente."),

  phone: z.string().optional(),

  email: z
    .string()
    .email("E-mail inválido.")
    .optional()
    .or(z.literal("")),

  company: z.string().optional(),

  lead_source: z.string().optional(),

  estimated_value: z.coerce.number().optional(),

  notes: z.string().optional(),
});

export type CustomerFormData =
  z.infer<typeof customerSchema>;