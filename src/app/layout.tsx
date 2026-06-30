import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/src/components/ui/tooltip";
import { Toaster } from "sonner";
import "./globals.css";

import { AuthProvider } from "@/src/context/auth-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZapLead — CRM de Leads do WhatsApp",
  description:
    "Organize os clientes recebidos pelo WhatsApp. CRM simples para vendedores, afiliados, corretores e autônomos.",
};

export const viewport: Viewport = {
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
  <AuthProvider>
    <TooltipProvider delay={150}>
      {children}
    </TooltipProvider>
  </AuthProvider>

  <Toaster richColors position="top-right" />

  {process.env.NODE_ENV === "production" && <Analytics />}
</body>
    </html>
  );
}