import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function MarketingLayout({
  children,
}: Props) {
  return (
    <main className="min-h-screen bg-background">
      {children}
    </main>
  );
}