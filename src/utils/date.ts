export function toUTC(date: string) {
  if (!date) return null;

  return new Date(date).toISOString();
}

export function fromUTC(date: string) {
  if (!date) return "";

  const d = new Date(date);

  const offset = d.getTimezoneOffset() * 60000;

  return new Date(d.getTime() - offset)
    .toISOString()
    .slice(0, 16);
}

export function formatDateTime(date: string | null) {
  if (!date) return "Sem prazo";

  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}