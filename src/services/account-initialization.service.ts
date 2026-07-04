class AccountInitializationService {
  async initialize(userId: string) {
    const response = await fetch(
      "/api/account/initialize",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message ?? "Erro ao inicializar conta."
      );
    }

    return result;
  }
}

export const accountInitializationService =
  new AccountInitializationService();