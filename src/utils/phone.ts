export function formatPhone(phone?: string | null) {
  if (!phone) return "—";

  const digits = phone.replace(/\D/g, "");

  if (digits.length !== 11) return phone;

  return digits.replace(
    /(\d{2})(\d{5})(\d{4})/,
    "($1) $2-$3"
  );
}