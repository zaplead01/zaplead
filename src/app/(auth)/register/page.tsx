import { AuthLayout } from "@/src/components/auth-layout";
import { RegisterForm } from "@/src/components/forms/auth/register-form";

export default function RegisterPage() {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
}