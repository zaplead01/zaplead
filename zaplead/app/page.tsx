"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { MessageCircle } from "lucide-react"

import { AuthLayout } from "@/components/auth-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"

export default function LoginPage() {
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    router.push("/dashboard")
  }

  return (
    <AuthLayout>
      <div className="mb-8 lg:hidden">
        <span className="inline-flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <MessageCircle className="size-5" />
          </span>
          <span className="text-lg font-semibold tracking-tight">ZapLead</span>
        </span>
      </div>

      <h2 className="text-2xl font-semibold tracking-tight">
        Bem-vindo de volta
      </h2>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Entre na sua conta para gerenciar seus leads.
      </p>

      <form onSubmit={handleSubmit} className="mt-8">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email">E-mail</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="voce@email.com"
              defaultValue="joao@zaplead.com"
              required
            />
          </Field>
          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="senha">Senha</FieldLabel>
              <Link
                href="#"
                className="text-sm font-medium text-primary hover:underline"
              >
                Esqueceu a senha?
              </Link>
            </div>
            <Input
              id="senha"
              type="password"
              placeholder="••••••••"
              defaultValue="senha123"
              required
            />
          </Field>
          <Field orientation="horizontal">
            <Checkbox id="lembrar" defaultChecked />
            <FieldLabel htmlFor="lembrar" className="font-normal">
              Manter conectado
            </FieldLabel>
          </Field>
          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </FieldGroup>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Não tem uma conta?{" "}
        <Link
          href="/cadastro"
          className="font-medium text-primary hover:underline"
        >
          Cadastre-se grátis
        </Link>
      </p>
    </AuthLayout>
  )
}
