"use client";

type Props = {
  icon: React.ReactNode;
  title: string;
  value: React.ReactNode;
};

export function CustomerInfoCard({
  icon,
  title,
  value,
}: Props) {
  return (
    <div className="flex items-start gap-4 rounded-xl border p-4">
      <div className="mt-1 text-primary">
        {icon}
      </div>

      <div className="flex-1">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          {title}
        </p>

        <div className="mt-2">
          {value}
        </div>
      </div>
    </div>
  );

}