type Customer = {
  estimated_value: number | null;
  pipeline_stage: {
    is_won: boolean;
    is_lost: boolean;
  } | null;
  next_follow_up_at: string | null;
  last_contact_at: string | null;
};

export function buildMetrics(customers: Customer[]) {
  const totalLeads = customers.length;

  const pipelineValue = customers.reduce(
    (total, customer) =>
      total + Number(customer.estimated_value ?? 0),
    0
  );

  const wonDeals = customers.filter(
    (customer) => customer.pipeline_stage?.is_won
  ).length;

  const lostDeals = customers.filter(
    (customer) => customer.pipeline_stage?.is_lost
  ).length;

  const conversionRate =
    totalLeads === 0
      ? 0
      : Number(
          ((wonDeals / totalLeads) * 100).toFixed(1)
        );

  const averageTicket =
    totalLeads === 0
      ? 0
      : pipelineValue / totalLeads;

  const today = new Date();

  const overdueFollowUps = customers.filter((customer) => {
    if (!customer.next_follow_up_at) return false;

    return (
      new Date(customer.next_follow_up_at) < today
    );
  }).length;

  const customersWithoutContact = customers.filter(
    (customer) => !customer.last_contact_at
  ).length;

  return {
    totalLeads,
    pipelineValue,
    wonDeals,
    lostDeals,
    conversionRate,
    averageTicket,
    overdueFollowUps,
    customersWithoutContact,
  };
}