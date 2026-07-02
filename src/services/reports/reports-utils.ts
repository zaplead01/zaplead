export function normalizeSource(
  source?: string | null
) {
  if (!source) return "Não informado";

  const value = source.trim().toLowerCase();

  switch (value) {
    case "whatsapp":
      return "WhatsApp";

    case "instagram":
      return "Instagram";

    case "facebook":
      return "Facebook";

    case "site":
      return "Site";

    case "indicacao":
    case "indicação":
      return "Indicação";

    default:
      return source.trim();
  }
}

export function isWithinPeriod(
  date: string,
  period: "today" | "7days" | "30days" | "month"
) {
  const customerDate = new Date(date);

  const today = new Date();

  switch (period) {
    case "today":
      return (
        customerDate.toDateString() ===
        today.toDateString()
      );

    case "7days": {
      const start = new Date();

      start.setDate(today.getDate() - 7);

      return customerDate >= start;
    }

    case "30days": {
      const start = new Date();

      start.setDate(today.getDate() - 30);

      return customerDate >= start;
    }

    case "month":
      return (
        customerDate.getMonth() ===
          today.getMonth() &&
        customerDate.getFullYear() ===
          today.getFullYear()
      );

    default:
      return true;
  }
}

export function daysWithoutContact(
  lastContact?: string | null
) {
  if (!lastContact) return null;

  const diff =
    Date.now() -
    new Date(lastContact).getTime();

  return Math.floor(
    diff / (1000 * 60 * 60 * 24)
  );
}