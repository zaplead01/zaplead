import { authService } from "./auth.service";
import { dashboardRepository } from "@/src/repositories/dashboard.repository";
import { reportsRepository } from "@/src/repositories/reports/reports.repository";

class ReportsService {
  async getReports() {
    const {
      data: { user },
    } = await authService.me();

    if (!user) {
      throw new Error("Usuário não autenticado.");
    }

    const { data: membership } =
      await dashboardRepository.getMembership(user.id);

    if (!membership) {
      throw new Error("Organização não encontrada.");
    }

    const organizationId = membership.organizations.id;

    const { data: customers, error } =
      await reportsRepository.getCustomers(organizationId);

    if (error) {
      throw error;
    }

    const totalLeads = customers.length;

    const pipelineValue = customers.reduce(
      (total: number, customer: any) =>
        total + Number(customer.estimated_value ?? 0),
      0
    );

    const wonDeals = customers.filter(
      (customer: any) => customer.pipeline_stage?.is_won
    ).length;

    const lostDeals = customers.filter(
      (customer: any) => customer.pipeline_stage?.is_lost
    ).length;

    const conversionRate =
      totalLeads === 0
        ? 0
        : Number(((wonDeals / totalLeads) * 100).toFixed(1));

    // ==========================
    // Leads por dia
    // ==========================

    // ==========================
// Leads por data (últimos 30 dias)
// ==========================

const leadsMap = new Map<string, number>();

// Cria os últimos 30 dias com valor 0
for (let i = 29; i >= 0; i--) {
  const date = new Date();

  date.setDate(date.getDate() - i);

  const key = date.toLocaleDateString("pt-BR");

  leadsMap.set(key, 0);
}

// Soma os leads cadastrados em cada dia
customers.forEach((customer: any) => {
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

    const pipeline = new Map<string, number>();

    customers.forEach((customer: any) => {
      const stage =
        customer.pipeline_stage?.name ?? "Sem etapa";

      pipeline.set(
        stage,
        (pipeline.get(stage) ?? 0) + 1
      );
    });

    const pipelineChart = Array.from(
      pipeline.entries()
    ).map(([stage, total]) => ({
      stage,
      total,
    }));

    // ==========================
    // Origem
    // ==========================

    const sources = new Map<string, number>();

    customers.forEach((customer: any) => {
      const source =
        customer.lead_source ?? "Não informado";

      sources.set(
        source,
        (sources.get(source) ?? 0) + 1
      );
    });

    const sourceChart = Array.from(
      sources.entries()
    ).map(([name, value]) => ({
      name,
      value,
    }));

    // ==========================
    // Clientes sem contato
    // ==========================

    const inactiveCustomers = [...customers]
      .sort((a: any, b: any) => {
        const first = a.last_contact_at
          ? new Date(a.last_contact_at).getTime()
          : 0;

        const second = b.last_contact_at
          ? new Date(b.last_contact_at).getTime()
          : 0;

        return first - second;
      })
      .slice(0, 10);

    return {
      metrics: {
        totalLeads,
        pipelineValue,
        wonDeals,
        lostDeals,
        conversionRate,
      },

      leadsChart,

      pipelineChart,

      sourceChart,

      inactiveCustomers,

      customers,
    };
  }
}

export const reportsService = new ReportsService();