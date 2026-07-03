export function Stats() {
  const stats = [
    {
      value: "+10",
      label: "Empresas utilizando",
    },
    {
      value: "+2 mil",
      label: "Clientes organizados",
    },
    {
      value: "99,9%",
      label: "Disponibilidade",
    },
    {
      value: "24/7",
      label: "Suporte online",
    },
  ];

  return (
    <section className="border-y bg-muted/30 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="text-center"
            >
              <h2 className="text-4xl font-bold tracking-tight text-primary">
                {item.value}
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}