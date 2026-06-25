import { AuthLayout } from "@/src/components/auth-layout";
import { LoginForm } from "@/src/components/forms/auth/login-form";

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}