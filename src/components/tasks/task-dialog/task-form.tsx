"use client";

import {
  Calendar,
  FileText,
  Flag,
  Save,
  Type,
  User,
  X,
} from "lucide-react";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Textarea } from "@/src/components/ui/textarea";
import { CustomerSelect } from "@/src/components/ui/customer-select";

type Props = {
  editing: boolean;
  loading: boolean;

  form: {
    title: string;
    description: string;
    customer_id: string;
    priority: string;
    due_date: string;
  };

  setForm: React.Dispatch<
    React.SetStateAction<{
      title: string;
      description: string;
      customer_id: string;
      priority: string;
      due_date: string;
    }>
  >;

  onSave: () => void;
  onCancel: () => void;
};

export function TaskForm({
  editing,
  loading,
  form,
  setForm,
  onSave,
  onCancel,
}: Props) {
  return (
    <div className="flex h-full flex-col">

      {/* Header */}
      <div className="border-b px-6 py-5">
        <h2 className="text-xl font-bold">
          {editing ? "Editar tarefa" : "Nova tarefa"}
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Organize atividades e follow-ups dos seus clientes.
        </p>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">

        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Type size={16} />
            Título
          </Label>

          <Input
            placeholder="Ex.: Ligar para João"
            value={form.title}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <FileText size={16} />
            Descrição
          </Label>

          <Textarea
            rows={3}
            placeholder="Descreva a tarefa..."
            value={form.description}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
        </div>

        <div className="grid grid-cols-2 gap-4">

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <User size={16} />
              Cliente
            </Label>

            <CustomerSelect
              value={form.customer_id}
              onChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  customer_id: value,
                }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Flag size={16} />
              Prioridade
            </Label>

            <select
              className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              value={form.priority}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  priority: e.target.value,
                }))
              }
            >
              <option value="low">Baixa</option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
            </select>
          </div>

        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Calendar size={16} />
            Data e hora
          </Label>

          <Input
            type="datetime-local"
            value={form.due_date}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                due_date: e.target.value,
              }))
            }
          />
        </div>

      </div>

      {/* Footer */}
      <div className="border-t bg-background px-6 py-4">
        <div className="flex justify-end gap-3">

          <Button
            variant="outline"
            onClick={onCancel}
          >
            <X className="mr-2 h-4 w-4" />
            Cancelar
          </Button>

          <Button
            disabled={loading}
            onClick={onSave}
          >
            <Save className="mr-2 h-4 w-4" />
            {loading ? "Salvando..." : "Salvar"}
          </Button>

        </div>
      </div>

    </div>
  );
}