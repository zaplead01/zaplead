import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

import { Badge } from "@/src/components/ui/badge";

import { Clock3, Building2, User } from "lucide-react";

interface InactiveCustomer {
  id: string;
  full_name: string;
  company: string | null;
  last_contact_at: string | null;
}

interface InactiveCustomersProps {
  data: InactiveCustomer[];
}

function getDays(lastContact: string | null) {
  if (!lastContact) return null;

  const diff =
    Date.now() - new Date(lastContact).getTime();

  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function InactiveCustomers({
  data,
}: InactiveCustomersProps) {
  return (
    <Card className="rounded-2xl border shadow-sm transition-all duration-300 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl">
            Clientes sem contato
          </CardTitle>

          <CardDescription>
            Clientes que precisam de um follow-up.
          </CardDescription>
        </div>

        <Badge variant="secondary" className="text-sm">
          {data.length} cliente{data.length !== 1 ? "s" : ""}
        </Badge>
      </CardHeader>

      <CardContent>
        {data.length === 0 ? (
          <div className="flex h-40 flex-col items-center justify-center rounded-xl border border-dashed">
            <Clock3 className="mb-3 h-8 w-8 text-muted-foreground" />

            <p className="font-medium">
              Tudo em dia 🎉
            </p>

            <p className="text-sm text-muted-foreground">
              Nenhum cliente aguardando contato.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {data.map((customer) => {
              const days = getDays(customer.last_contact_at);

              let badgeVariant:
                | "default"
                | "secondary"
                | "destructive" = "secondary";

              let badgeText = "Nunca";

              if (days !== null) {
                badgeText =
                  days === 1
                    ? "1 dia"
                    : `${days} dias`;

                if (days >= 30) {
                  badgeVariant = "destructive";
                } else if (days >= 15) {
                  badgeVariant = "default";
                }
              }

              return (
                <div
                  key={customer.id}
                  className="flex items-center justify-between rounded-xl border p-4 transition-all duration-200 hover:bg-muted/40"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                      {getInitials(customer.full_name)}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />

                        <p className="font-semibold">
                          {customer.full_name}
                        </p>
                      </div>

                      {customer.company && (
                        <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                          <Building2 className="h-4 w-4" />

                          {customer.company}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <Badge variant={badgeVariant}>
                      {badgeText}
                    </Badge>

                    <div className="mt-2 flex items-center justify-end gap-1 text-xs text-muted-foreground">
                      <Clock3 className="h-3.5 w-3.5" />

                      Sem contato
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}