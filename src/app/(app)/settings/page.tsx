import { PageHeader } from "@/src/components/page-header";
import { SettingsForm } from "@/src/components/settings/settings-form";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Configurações"
        description="Gerencie suas preferências e opções da conta."
      />

      <SettingsForm />
    </div>
  );
}