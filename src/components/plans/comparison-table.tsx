import { Check, Minus } from "lucide-react";

const rows = [
  {
    feature: "Usuários",
    free: "1",
    pro: "Até 2",
    enterprise: "Ilimitado",
  },
  {
    feature: "Clientes",
    free: "Até 100",
    pro: "Ilimitado",
    enterprise: "Ilimitado",
  },
  {
    feature: "Pipelines",
    free: "1",
    pro: "Ilimitado",
    enterprise: "Ilimitado",
  },
  {
    feature: "Dashboard",
    free: true,
    pro: true,
    enterprise: true,
  },
  {
    feature: "Tarefas",
    free: true,
    pro: true,
    enterprise: true,
  },
  {
    feature: "Relatórios Premium",
    free: false,
    pro: true,
    enterprise: true,
  },
  {
    feature: "Etiquetas",
    free: false,
    pro: true,
    enterprise: true,
  },
  {
    feature: "API",
    free: false,
    pro: false,
    enterprise: true,
  },
  {
    feature: "Integrações",
    free: false,
    pro: false,
    enterprise: true,
  },
  {
    feature: "Suporte Prioritário",
    free: false,
    pro: true,
    enterprise: true,
  },
];

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="mx-auto h-5 w-5 text-primary" />
    ) : (
      <Minus className="mx-auto h-5 w-5 text-muted-foreground" />
    );
  }

  return <span>{value}</span>;
}

export function ComparisonTable() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold">
            Compare todos os recursos
          </h2>

          <p className="mt-4 text-lg text-muted-foreground">
            Veja exatamente o que está incluído em cada plano.
          </p>
        </div>

        <div className="mt-12 overflow-x-auto rounded-3xl border">
          <table className="w-full border-collapse">
            <thead className="bg-muted/50">
              <tr>
                <th className="p-5 text-left">Recursos</th>
                <th className="p-5">Free</th>
                <th className="p-5 text-primary">Pro</th>
                <th className="p-5">Enterprise</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.feature}
                  className="border-t"
                >
                  <td className="p-5 font-medium">
                    {row.feature}
                  </td>

                  <td className="p-5 text-center">
                    <Cell value={row.free} />
                  </td>

                  <td className="bg-primary/5 p-5 text-center">
                    <Cell value={row.pro} />
                  </td>

                  <td className="p-5 text-center">
                    <Cell value={row.enterprise} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}