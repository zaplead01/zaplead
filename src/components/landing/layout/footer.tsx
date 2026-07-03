import Link from "next/link";
import {
  Globe,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-16">

        <div className="grid gap-12 lg:grid-cols-5">

          {/* Logo */}

          <div className="lg:col-span-2">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <MessageCircle className="h-6 w-6" />
              </div>

              <div>

                <h3 className="text-xl font-bold">
                  ZapLead
                </h3>

                <p className="text-sm text-muted-foreground">
                  CRM simples para quem vende pelo WhatsApp.
                </p>

              </div>

            </div>

            <p className="mt-6 max-w-md leading-7 text-muted-foreground">
              Organize clientes, acompanhe negociações, gerencie tarefas
              e aumente suas vendas utilizando um CRM moderno,
              simples e intuitivo.
            </p>

            <div className="mt-8 flex gap-4">

              <a
                href="#"
                className="rounded-lg border p-3 transition hover:bg-muted"
              >
                <Globe  className="h-5 w-5" />
              </a>

              <a
                href="#"
                className="rounded-lg border p-3 transition hover:bg-muted"
              >
                <Mail  className="h-5 w-5" />
              </a>

              <a
                href="#"
                className="rounded-lg border p-3 transition hover:bg-muted"
              >
                <Phone  className="h-5 w-5" />
              </a>

            </div>

          </div>

          {/* Produto */}

          <div>

            <h4 className="font-semibold">
              Produto
            </h4>

            <div className="mt-5 space-y-3">

              <Link
                href="/planos"
                className="block text-muted-foreground hover:text-primary"
              >
                Planos
              </Link>

              <Link
                href="/login"
                className="block text-muted-foreground hover:text-primary"
              >
                Entrar
              </Link>

              <Link
                href="/register"
                className="block text-muted-foreground hover:text-primary"
              >
                Criar Conta
              </Link>

            </div>

          </div>

          {/* Empresa */}

          <div>

            <h4 className="font-semibold">
              Empresa
            </h4>

            <div className="mt-5 space-y-3">

              <Link
                href="/contato"
                className="block text-muted-foreground hover:text-primary"
              >
                Contato
              </Link>

              <Link
                href="/sobre"
                className="block text-muted-foreground hover:text-primary"
              >
                Sobre
              </Link>

              <Link
                href="/faq"
                className="block text-muted-foreground hover:text-primary"
              >
                FAQ
              </Link>

            </div>

          </div>

          {/* Legal */}

          <div>

            <h4 className="font-semibold">
              Legal
            </h4>

            <div className="mt-5 space-y-3">

              <Link
                href="/termos"
                className="block text-muted-foreground hover:text-primary"
              >
                Termos de Uso
              </Link>

              <Link
                href="/privacidade"
                className="block text-muted-foreground hover:text-primary"
              >
                Política de Privacidade
              </Link>

            </div>

          </div>

        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t pt-8 text-sm text-muted-foreground md:flex-row">

          <p>
            © {new Date().getFullYear()} ZapLead. Todos os direitos reservados.
          </p>

        

        </div>

      </div>
    </footer>
  );
}