import { PageHeader } from "@/src/components/page-header";
import { CompanyForm } from "@/src/components/company/company-form";
import { MembersCard } from "@/src/components/company/members-card";
import { PlanCard } from "@/src/components/company/plan-card";

export default function CompanyPage() {
  return (
    <div className="flex flex-col gap-6">

      <PageHeader
        title="Empresa"
        description="Gerencie as informações da sua empresa."
      />

      <CompanyForm />

      <MembersCard />

      <PlanCard />

    </div>
  );
}