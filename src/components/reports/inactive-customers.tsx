import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

interface InactiveCustomer {
  id: string;
  full_name: string;
  company: string | null;
  last_contact_at: string | null;
}

interface InactiveCustomersProps {
  data: InactiveCustomer[];
}

function getDaysWithoutContact(lastContact: string | null) {
  if (!lastContact) return "Nunca";

  const diff =
    Date.now() - new Date(lastContact).getTime();

  return `${Math.floor(diff / (1000 * 60 * 60 * 24))} dias`;
}

export function InactiveCustomers({
  data,
}: InactiveCustomersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Clientes sem contato
        </CardTitle>
      </CardHeader>

      <CardContent>
        {data.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nenhum cliente encontrado.
          </p>
        ) : (
          <div className="space-y-4">
            {data.map((customer) => (
              <div
                key={customer.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <p className="font-medium">
                    {customer.full_name}
                  </p>

                  {customer.company && (
                    <p className="text-sm text-muted-foreground">
                      {customer.company}
                    </p>
                  )}
                </div>

                <span className="text-sm text-muted-foreground">
                  {getDaysWithoutContact(
                    customer.last_contact_at
                  )}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}