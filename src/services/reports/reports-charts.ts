import {
  daysWithoutContact,
  normalizeSource,
} from "./reports-utils";

type Customer = {
  full_name: string;
  company: string | null;
  created_at: string;
  lead_source: string | null;
  last_contact_at: string | null;
  pipeline_stage: {
    id: string;
    name: string;
    position?: number;
  } | null;
};

export function buildCharts(customers: Customer[]) {
  // ==========================
  // Leads por dia (30 dias)
  // ==========================

  const leadsMap = new Map<string, number>();

  for (let i = 29; i >= 0; i--) {
    const date = new Date();

    date.setDate(date.getDate() - i);

    const key = date.toLocaleDateString("pt-BR");

    leadsMap.set(key, 0);
  }

  customers.forEach((customer) => {
    const key = new Date(
      customer.created_at
    ).toLocaleDateString("pt-BR");

    if (leadsMap.has(key)) {
      leadsMap.set(
        key,
        (leadsMap.get(key) ?? 0) + 1
      );
    }
  });

  const leadsChart = Array.from(
    leadsMap.entries()
  ).map(([day, leads]) => ({
    day,
    leads,
  }));

  // ==========================
  // Pipeline
  // ==========================

  const pipelineMap = new Map<
    string,
    {
      stage: string;
      total: number;
      position: number;
    }
  >();

  customers.forEach((customer) => {
    const stage =
      customer.pipeline_stage?.name ?? "Sem etapa";

    const position =
      customer.pipeline_stage?.position ?? 999;

    if (!pipelineMap.has(stage)) {
      pipelineMap.set(stage, {
        stage,
        total: 0,
        position,
      });
    }

    pipelineMap.get(stage)!.total++;
  });

  const pipelineChart = Array.from(
    pipelineMap.values()
  ).sort((a, b) => a.position - b.position);

  // ==========================
  // Origem
  // ==========================

  const sourceMap = new Map<string, number>();

  customers.forEach((customer) => {
    const source = normalizeSource(
      customer.lead_source
    );

    sourceMap.set(
      source,
      (sourceMap.get(source) ?? 0) + 1
    );
  });

  const sourceChart = Array.from(
    sourceMap.entries()
  ).map(([name, value]) => ({
    name,
    value,
  }));

  // ==========================
  // Clientes sem contato
  // ==========================

  const inactiveCustomers = customers
    .map((customer) => ({
      id: customer.full_name,
      full_name: customer.full_name,
      company: customer.company,
      last_contact_at: customer.last_contact_at,
      days:
        daysWithoutContact(
          customer.last_contact_at
        ) ?? 9999,
    }))
    .sort((a, b) => b.days - a.days)
    .slice(0, 10)
    .map(({ days, ...customer }) => customer);

  return {
    leadsChart,
    pipelineChart,
    sourceChart,
    inactiveCustomers,
  };
}