import { authService } from "../auth.service";
import { dashboardRepository } from "@/src/repositories/dashboard.repository";
import { reportsRepository } from "@/src/repositories/reports/reports.repository";

import { buildMetrics } from "./reports-metrics";
import { buildCharts } from "./reports-charts";
import { isWithinPeriod } from "./reports-utils";

type ReportsFilters = {
  period: "today" | "7days" | "30days" | "month" | "90days";
  pipeline: string;
};

class ReportsService {
  async getReports(filters: ReportsFilters) {
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

    const organizationId =
      membership.organizations.id;

    const {
      data: customers,
      error,
    } = await reportsRepository.getCustomers(
      organizationId
    );

    if (error) {
      throw error;
    }

    let customerList = customers ?? [];

    // ==========================
    // Filtro por período
    // ==========================

    customerList = customerList.filter((customer) =>
      isWithinPeriod(
        customer.created_at,
        filters.period
      )
    );

    // ==========================
    // Filtro por Pipeline
    // ==========================

    if (filters.pipeline !== "all") {
      customerList = customerList.filter(
        (customer) =>
          customer.pipeline_stage?.id ===
          filters.pipeline
      );
    }

    const metrics =
      buildMetrics(customerList);

    const charts =
      buildCharts(customerList);

    return {
      metrics,
      ...charts,
    };
  }
}

export const reportsService =
  new ReportsService();