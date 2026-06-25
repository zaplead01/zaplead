import { CustomerDetails } from "@/src/components/customers/customer-details";

export default async function ClienteDetalhesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <CustomerDetails id={id} />;
}