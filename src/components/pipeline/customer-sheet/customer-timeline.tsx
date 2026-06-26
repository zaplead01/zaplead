"use client";

import {
  Clock3,
  Circle,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

export function CustomerTimeline() {
  const events = [
    {
      title: "Cliente criado",
      date: "Hoje",
    },
    {
      title: "Entrou na etapa atual",
      date: "Hoje",
    },
    {
      title: "Primeiro contato",
      date: "--",
    },
  ];

  return (
    <Card className="border-0 shadow-sm">

      <CardHeader>

        <CardTitle className="flex items-center gap-2">

          <Clock3 className="h-5 w-5 text-primary" />

          Timeline

        </CardTitle>

      </CardHeader>

      <CardContent>

        <div className="space-y-5">

          {events.map((event, index) => (

            <div
              key={index}
              className="flex gap-4"
            >

              <div className="flex flex-col items-center">

                <Circle className="h-3 w-3 fill-primary text-primary" />

                {index !== events.length - 1 && (
                  <div className="mt-1 h-12 w-px bg-border" />
                )}

              </div>

              <div>

                <p className="font-medium">

                  {event.title}

                </p>

                <p className="text-sm text-muted-foreground">

                  {event.date}

                </p>

              </div>

            </div>

          ))}

        </div>

      </CardContent>

    </Card>
  );
}