class CompanyService {
  async getCurrent() {
    const response = await fetch("/api/company");

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.error ??
          "Erro ao carregar empresa."
      );
    }

    return result;
  }

  async update(data: {
    name?: string;
    phone?: string | null;
    email?: string | null;
  }) {
    const response = await fetch("/api/company", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.error ??
          "Erro ao atualizar empresa."
      );
    }

    return result;
  }
}

export const companyService = new CompanyService();