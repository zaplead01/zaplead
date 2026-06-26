"use client";

type Props = {
  icon: React.ReactNode;
  title: string;
  value?: string | null;
};

export function CustomerInfoCard({
  icon,
  title,
  value,
}: Props) {
  return (
    <div
      className="
        flex
        items-center
        gap-4

        rounded-xl

        border

        p-4

        transition-all
        duration-200

        hover:border-primary/30
        hover:bg-muted/30
      "
    >
      <div
        className="
          flex
          h-11
          w-11

          items-center
          justify-center

          rounded-xl

          bg-primary/10

          text-primary
        "
      >
        {icon}
      </div>

      <div className="flex-1">

        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          {title}
        </p>

        <p className="font-semibold break-all">
          {value || "-"}
        </p>

      </div>

    </div>
  );
}