# Modelo de Domínio do ZapLead

## Objetivo

Este documento define todas as entidades de negócio do ZapLead e como elas se relacionam.

Nenhuma funcionalidade deverá ser desenvolvida sem antes estar representada neste modelo.

---

# Organização (Organization)

Representa uma empresa que utiliza o ZapLead.

Uma organização possui:

- Usuários
- Assinatura
- Funis
- Clientes
- Tarefas
- Relatórios
- Configurações

---

# Usuário (Profile)

Representa uma pessoa que acessa o sistema.

Cada usuário pertence a apenas uma organização.

Responsabilidades:

- Gerenciar clientes
- Criar tarefas
- Registrar observações
- Acompanhar negociações

---

# Assinatura (Subscription)

Representa o plano contratado pela organização.

Planos disponíveis:

- Free
- Pro
- Business

Controla:

- Status
- Trial
- Renovação
- Integração futura com gateway de pagamento

---

# Pipeline

Representa um funil de vendas.

Cada organização pode possuir vários funis.

Exemplos:

- Comercial
- Pós-venda
- Renovações

---

# Pipeline Stage

Representa uma etapa de um funil.

Exemplo:

- Novo Lead
- Contato
- Proposta
- Negociação
- Fechado

---

# Customer

Representa um Lead ou Cliente.

Cada cliente pertence a:

- Organização
- Funil
- Etapa

Pode possuir:

- Notas
- Tarefas
- Atividades
- Arquivos
- Tags

---

# Customer Note

Representa uma anotação feita manualmente por um usuário.

Exemplos:

- Cliente pediu orçamento.
- Ligar amanhã.
- Enviar proposta.

---

# Task

Representa uma atividade.

Exemplos:

- Ligar
- Enviar orçamento
- Agendar visita

Cada tarefa possui:

- Responsável
- Prioridade
- Status
- Data de vencimento

---

# Activity

Representa eventos automáticos do sistema.

Exemplos:

- Cliente criado
- Cliente alterado
- Mudança de etapa
- Venda concluída

---

# Tag

Representa etiquetas utilizadas para organização dos clientes.

Exemplos:

- VIP
- Urgente
- Orçamento
- Retorno

---

# File

Representa arquivos anexados ao cliente.

Exemplos:

- PDF
- Contrato
- Imagem
- Áudio

---

# Notification

Representa notificações enviadas pelo sistema.

Exemplos:

- Tarefa vence hoje
- Cliente sem contato há 15 dias
- Trial termina amanhã

---

# Custom Field

Representa campos personalizados criados pela organização.

Exemplos:

- CPF
- Instagram
- Modelo do veículo

---

# Activity Log

Registra ações técnicas do sistema para auditoria.

Exemplos:

- Login
- Alteração de plano
- Exclusão de cliente
- Alteração de configurações

---

# Visão Geral do Domínio

Organization

├── Profiles

├── Subscription

├── Pipelines

│     └── Pipeline Stages

├── Customers

│     ├── Notes

│     ├── Tasks

│     ├── Activities

│     ├── Files

│     └── Tags

├── Notifications

├── Custom Fields

└── Activity Logs