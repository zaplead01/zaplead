"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, MessageCircle } from "lucide-react";

import { Button } from "@/src/components/ui/button";

const navigation = [
  {
    label: "Recursos",
    href: "/recursos",
  },
  {
    label: "Planos",
    href: "/planos",
  },
  {
    label: "Contato",
    href: "/contato",
  },
  {
    label: "FAQ",
    href: "/faq",
  },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-90"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <MessageCircle className="h-5 w-5" strokeWidth={2.5} />
          </div>

          <span className="text-lg font-bold tracking-tight">
            ZapLead
          </span>
        </Link>

        {/* Desktop */}
        <nav className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-2 md:flex">
          <Link href="/login">
            <Button variant="ghost">
              Entrar
            </Button>
          </Link>

          <Link href="/register">
            <Button>
              Começar grátis
            </Button>
          </Link>
        </div>

        {/* Mobile Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t bg-background md:hidden">
          <div className="container mx-auto space-y-2 px-4 py-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-4 flex flex-col gap-2 border-t pt-4">
              <Link href="/login" onClick={() => setOpen(false)}>
                <Button variant="ghost" className="w-full">
                  Entrar
                </Button>
              </Link>

              <Link href="/register" onClick={() => setOpen(false)}>
                <Button className="w-full">
                  Começar grátis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}