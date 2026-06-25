# Arquitetura do Banco de Dados

## Objetivo

O banco de dados do ZapLead foi projetado para suportar um CRM moderno, escalável e preparado para futuras integrações, mantendo simplicidade para pequenas empresas.

Toda a arquitetura é baseada em **Workspace**, permitindo que cada empresa possua seus próprios usuários, clientes, funis e dados.

---

# Princípios da Arquitetura

## Multi-tenant

Cada empresa possui seu próprio Workspace.

Nenhum dado é compartilhado entre empresas.

---

## Escalabilidade

A arquitetura deve suportar:

- Plano Free
- Plano Pro
- Plano Business

Sem necessidade de refatoração estrutural.

---

## Segurança

Toda consulta será protegida por Row Level Security (RLS).

Cada usuário poderá acessar apenas os dados do seu Workspace.

---

## Modularidade

Cada responsabilidade possui sua própria tabela.

Exemplos:

- Clientes
- Tarefas
- Observações
- Atividades
- Tags
- Arquivos

Nunca misturar responsabilidades na mesma tabela.

---

# Estrutura Geral

Workspace
│
├── Usuários
├── Assinatura
├── Funis
│      └── Etapas
│
├── Clientes
│      ├── Observações
│      ├── Tarefas
│      ├── Atividades
│      ├── Arquivos
│      └── Tags
│
├── Notificações
│
├── Campos Personalizados
│
└── Logs

---

# Entidades

## Workspace

Representa uma empresa cadastrada no sistema.

Responsável por isolar todos os dados.

---

## Profiles

Representa os usuários autenticados.

Relaciona o usuário do Supabase Auth ao Workspace.

---

## Subscription

Responsável pelo plano contratado.

Controla:

- Plano
- Trial
- Renovação
- Integração futura com Stripe

---

## Pipelines

Funis comerciais.

Cada Workspace poderá possuir vários funis.

---

## Pipeline Stages

Etapas de cada funil.

Exemplo:

- Novo Lead
- Contato
- Proposta
- Negociação
- Fechado

---

## Customers

Principal entidade do CRM.

Armazena apenas os dados do cliente.

Todo o restante fica em tabelas específicas.

---

## Customer Notes

Histórico textual.

Cada observação representa um registro independente.

---

## Tasks

Controle de atividades e lembretes.

---

## Activities

Timeline automática do sistema.

Exemplos:

- Cliente criado
- Cliente alterado
- Mudança de etapa
- Venda concluída

---

## Tags

Etiquetas reutilizáveis.

---

## Customer Tags

Relacionamento entre Clientes e Tags.

---

## Files

Arquivos anexados ao cliente.

---

## Notifications

Notificações do sistema.

---

## Custom Fields

Campos personalizados criados por cada Workspace.

---

## Activity Logs

Logs técnicos e auditoria.

---

# Regras

Todos os dados pertencem a um Workspace.

Nenhum usuário acessa informações de outro Workspace.

Nenhuma tabela de negócio depende diretamente do auth.users.

Toda relação de negócio utiliza Workspace como referência principal.

---

# Tecnologias

Banco: PostgreSQL

Autenticação: Supabase Auth

Storage: Supabase Storage

Realtime: Supabase Realtime

Segurança: Row Level Security

---

# Objetivo Final

Construir um CRM preparado para crescer sem necessidade de mudanças estruturais no banco de dados.