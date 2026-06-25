"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
}  from "@/components/ui/alert-dialog";


import { toast } from "sonner";
import { customerService } from "@/src/services/customer.service";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  Calendar,
  DollarSign,
  Mail,
  Phone,
  StickyNote,
} from "lucide-react";
import { Pencil, Trash2, MessageCircle } from "lucide-react";
import { useCustomer } from "@/src/hooks/use-customer";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Avatar, AvatarFallback } from "@/src/components/ui/avatar";
import { Separator } from "@/src/components/ui/separator";

type Props = {
  id: string;
};


export function CustomerDetails({ id }: Props) {
  const router = useRouter();
  const { customer, loading } = useCustomer(id);


  async function handleDelete() {
  if (!customer) return;

  const confirmed = window.confirm(
    "Deseja realmente excluir este cliente?"
  );

  if (!confirmed) return;

  const result = await customerService.delete(customer.id);

  if (!result.success) {
    toast.error(result.message);
    return;
  }

  toast.success(result.message);

  router.push("/clientes");
  router.refresh();
}

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        Carregando...
      </div>
    );
  }
  

  if (!customer) {
    return (
      <div className="flex justify-center py-10">
        Cliente não encontrado.
      </div>
    );
  }
  

  const initials = customer.full_name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

    

      return (
    <div className="flex flex-col gap-6">

      <Button
        variant="ghost"
        size="sm"
        className="w-fit -ml-2"
        render={<Link href="/clientes" />}
      >
        <ArrowLeft className="size-4" />
        Voltar para clientes
      </Button>

      <div className="flex items-center justify-between gap-6">
  <div className="flex items-center gap-4">
    <Avatar className="size-14">
      <AvatarFallback className="text-lg">
        {initials}
      </AvatarFallback>
    </Avatar>

    <div>
      <h1 className="text-2xl font-semibold">
        {customer.full_name}
      </h1>

      <p className="text-muted-foreground">
        {customer.company || "Sem empresa"}
      </p>
    </div>
  </div>

  <div className="flex gap-2">
    <Button
      variant="default"
      onClick={() =>
        window.open(
          `https://wa.me/55${customer.phone?.replace(/\D/g, "")}`,
          "_blank"
        )
      }
      disabled={!customer.phone}
    >
      <MessageCircle className="size-4" />
      WhatsApp
    </Button>

    <Button
      variant="outline"
      render={<Link href={`/clientes/${customer.id}/editar`} />}
    >
      <Pencil className="size-4" />
      Editar
    </Button>

  <Button
  variant="destructive"
  onClick={handleDelete}
>
  Excluir
</Button>
  </div>
</div>
            <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Observações</CardTitle>
            </CardHeader>

            <CardContent>
              {customer.notes ? (
                <p className="whitespace-pre-wrap text-sm leading-relaxed">
                  {customer.notes}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Nenhuma observação cadastrada.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Informações</CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="flex items-center gap-3">
                <Phone className="size-4 text-muted-foreground" />

                <div>
                  <p className="text-xs text-muted-foreground">
                    Telefone
                  </p>

                  <p className="text-sm font-medium">
                    {customer.phone || "Não informado"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="size-4 text-muted-foreground" />

                <div>
                  <p className="text-xs text-muted-foreground">
                    E-mail
                  </p>

                  <p className="text-sm font-medium">
                    {customer.email || "Não informado"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Building2 className="size-4 text-muted-foreground" />

                <div>
                  <p className="text-xs text-muted-foreground">
                    Empresa
                  </p>

                  <p className="text-sm font-medium">
                    {customer.company || "Não informada"}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-center gap-3">
                <DollarSign className="size-4 text-muted-foreground" />

                <div>
                  <p className="text-xs text-muted-foreground">
                    Valor estimado
                  </p>

                  <p className="text-sm font-semibold">
                    {customer.estimated_value
                      ? new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(customer.estimated_value)
                      : "Não informado"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="size-4 text-muted-foreground" />

                <div>
                  <p className="text-xs text-muted-foreground">
                    Cadastrado em
                  </p>

                  <p className="text-sm font-medium">
                    {new Date(
                      customer.created_at
                    ).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <StickyNote className="size-4 text-muted-foreground" />

                <div>
                  <p className="text-xs text-muted-foreground">
                    Origem
                  </p>

                  <p className="text-sm font-medium">
                    {customer.lead_source || "Não informada"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
          </div>
  );
}