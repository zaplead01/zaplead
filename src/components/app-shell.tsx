"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  KanbanSquare,
  CheckSquare,
  BarChart3,
  MessageCircle,
  Menu,
  Search,
  Bell,
  LogOut,
  Settings,
} from "lucide-react"

import { cn } from "@/src/lib/utils"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Avatar, AvatarFallback } from "@/src/components/ui/avatar"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/src/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/clientes", label: "Clientes", icon: Users },
  { href: "/pipeline", label: "Funil de Vendas", icon: KanbanSquare },
  { href: "/tarefas", label: "Tarefas", icon: CheckSquare },
  { href: "/relatorios", label: "Relatórios", icon: BarChart3 },
]

function Brand() {
  return (
    <Link href="/dashboard" className="flex items-center gap-2.5 px-2">
      <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <MessageCircle className="size-5" />
      </span>
      <span className="text-lg font-semibold tracking-tight">ZapLead</span>
    </Link>
  )
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  return (
    <nav className="flex flex-col gap-1 px-3">
      {nav.map((item) => {
        const active =
          pathname === item.href || pathname.startsWith(item.href + "/")
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            <Icon className="size-4.5 shrink-0" />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

function SidebarBody({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col gap-6 py-5">
      <Brand />
      <p className="px-5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Menu
      </p>
      <NavLinks onNavigate={onNavigate} />
      <div className="mt-auto px-3">
        <div className="rounded-xl bg-accent p-4">
          <p className="text-sm font-semibold text-accent-foreground">
            Plano Pro
          </p>
          <p className="mt-1 text-xs text-accent-foreground/80">
            Leads ilimitados e relatórios avançados.
          </p>
          <Button size="sm" className="mt-3 w-full">
            Fazer upgrade
          </Button>
        </div>
      </div>
    </div>
  )
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar desktop */}
      <aside className="hidden w-64 shrink-0 border-r border-border bg-sidebar lg:block">
        <div className="sticky top-0 h-screen">
          <SidebarBody />
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur md:px-6">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="lg:hidden" />
              }
            >
              <Menu className="size-5" />
              <span className="sr-only">Abrir menu</span>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <SheetTitle className="sr-only">Menu de navegação</SheetTitle>
              <SidebarBody onNavigate={() => setOpen(false)} />
            </SheetContent>
          </Sheet>

          <div className="relative hidden max-w-sm flex-1 sm:block">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar clientes, tarefas..."
              className="pl-9"
            />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="size-5" />
              <span className="absolute right-2 top-2 size-2 rounded-full bg-primary" />
              <span className="sr-only">Notificações</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="ghost"
                    className="h-10 gap-2 px-2"
                  />
                }
              >
                <Avatar className="size-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    JS
                  </AvatarFallback>
                </Avatar>
                <span className="hidden text-sm font-medium sm:block">
                  João Silva
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Settings className="size-4" />
                    Configurações
                  </DropdownMenuItem>
                  <DropdownMenuItem render={<Link href="/" />}>
                    <LogOut className="size-4" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
