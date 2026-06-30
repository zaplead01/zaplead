export function buildReportMetrics(customers: any[]) {
  const totalLeads = customers.length;

  const pipelineValue = customers.reduce(
    (total, customer) => total + (customer.estimated_value ?? 0),
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
      : Number(((wonDeals / totalLeads) * 100).toFixed(1));

  return {
    totalLeads,
    pipelineValue,
    wonDeals,
    lostDeals,
    conversionRate,
  };
}