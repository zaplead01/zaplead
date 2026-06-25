import { AppShell } from "@/src/components/app-shell"
import { Toaster } from "@/src/components/ui/sonner"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AppShell>{children}</AppShell>
      <Toaster />
    </>
  )
}
