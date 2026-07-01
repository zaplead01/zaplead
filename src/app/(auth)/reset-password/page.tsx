import { AuthLayout } from "@/src/components/auth-layout";
import { ResetPasswordForm } from "@/src/components/forms/auth/forgot-password-form";

export default function ResetPasswordPage() {
  return (
    <AuthLayout>
      <ResetPasswordForm />
    </AuthLayout>
  );
}