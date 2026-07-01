"use client";

import { useMemo } from "react";
import { Bell, LogOut, Settings, Search } from "lucide-react";

import { useCurrentUser } from "@/src/hooks/use-current-user";
import { useAuth } from "@/src/hooks/use-auth";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import Link from "next/link";

import {
  User,
  CreditCard,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
} from "@/src/components/ui/avatar";

export function Header() {
  const { user } = useCurrentUser();
  const { logout } = useAuth();

  const fullName = useMemo(() => {
    return (
      (user?.user_metadata?.full_name as string) ||
      user?.email ||
      "Usuário"
    );
  }, [user]);

  const initials = useMemo(() => {
    return fullName
      .split(" ")
      .map((name) => name[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  }, [fullName]);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 px-6 backdrop-blur">

      <div className="relative hidden max-w-md flex-1 md:block">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          placeholder="Buscar clientes, empresas..."
          className="pl-9"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">

        <Button
          variant="ghost"
          size="icon"
          className="relative"
        >
          <Bell className="h-5 w-5" />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
        </Button>

        <DropdownMenu>
 <DropdownMenuTrigger
  render={
    <Button
      variant="ghost"
      className="flex h-10 items-center gap-2 px-2"
    />
  }
>
  <Avatar className="h-8 w-8">
    <AvatarFallback>{initials}</AvatarFallback>
  </Avatar>

  <div className="hidden lg:block text-left">
    <p className="text-sm font-medium">
      {fullName}
    </p>
  </div>
</DropdownMenuTrigger>

 <DropdownMenuContent
  align="end"
  className="w-60"
>
  <DropdownMenuGroup>
    <DropdownMenuLabel>
      <div className="flex flex-col">
        <span className="font-medium">{fullName}</span>
        <span className="text-xs text-muted-foreground">
          {user?.email}
        </span>
      </div>
    </DropdownMenuLabel>

    <DropdownMenuSeparator />

    

    <DropdownMenuItem
  render={<Link href="/profile" />}
>
  <User className="mr-2 h-4 w-4" />
  Meu Perfil
</DropdownMenuItem>

<DropdownMenuItem
  render={<Link href="/company" />}
>
  <CreditCard className="mr-2 h-4 w-4" />
  Empresa
</DropdownMenuItem>

<DropdownMenuItem
  render={<Link href="/settings" />}
>
  <Settings className="mr-2 h-4 w-4" />
  Configurações
</DropdownMenuItem>

    <DropdownMenuSeparator />

    <DropdownMenuItem
      onClick={logout}
      className="text-red-600 focus:text-red-600"
    >
      <LogOut className="mr-2 h-4 w-4" />
      Sair
    </DropdownMenuItem>
  </DropdownMenuGroup>
</DropdownMenuContent>
</DropdownMenu>

      </div>

    </header>
  );
}