"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { MessageCircle } from "lucide-react"

import { AuthLayout } from "@/components/auth-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"

export default function CadastroPage() {
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
        Crie sua conta grátis
      </h2>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Comece a organizar seus leads em poucos minutos.
      </p>

      <form onSubmit={handleSubmit} className="mt-8">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="nome">Nome completo</FieldLabel>
            <Input id="nome" placeholder="Seu nome" required />
          </Field>
          <Field>
            <FieldLabel htmlFor="email">E-mail</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="voce@email.com"
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="telefone">WhatsApp</FieldLabel>
            <Input id="telefone" placeholder="(11) 99999-9999" required />
          </Field>
          <Field>
            <FieldLabel htmlFor="senha">Senha</FieldLabel>
            <Input
              id="senha"
              type="password"
              placeholder="Mínimo 8 caracteres"
              required
            />
          </Field>
          <Field orientation="horizontal">
            <Checkbox id="termos" required />
            <FieldLabel htmlFor="termos" className="font-normal">
              Aceito os termos de uso e a política de privacidade
            </FieldLabel>
          </Field>
          <Button type="submit" className="w-full">
            Criar conta
          </Button>
        </FieldGroup>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Já tem uma conta?{" "}
        <Link href="/" className="font-medium text-primary hover:underline">
          Entrar
        </Link>
      </p>
    </AuthLayout>
  )
}
