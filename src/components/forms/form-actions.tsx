import { ReactNode } from "react";

interface FormActionsProps {
  children: ReactNode;
}

export function FormActions({
  children,
}: FormActionsProps) {
  return (
    <div className="pt-4">
      {children}
    </div>
  );
}