import { ProfileForm } from "@/src/components/profile/profile-form";
import { PageHeader } from "@/src/components/page-header";

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Meu Perfil"
        description="Gerencie suas informações pessoais."
      />

      <ProfileForm />
    </div>
  );
}