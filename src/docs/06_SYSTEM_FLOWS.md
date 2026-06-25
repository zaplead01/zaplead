# Fluxos do Sistema

## Objetivo

Este documento descreve todos os fluxos principais do ZapLead.

Cada fluxo representa uma sequência de ações realizadas pelo usuário e pelo sistema.

---

# Fluxo 01 - Cadastro

Usuário acessa a Landing Page

↓

Clica em "Criar Conta"

↓

Preenche:

- Nome
- Empresa
- Email
- Senha

↓

Sistema cria usuário no Supabase Auth

↓

Sistema cria Organization

↓

Sistema cria Organization Member (Owner)

↓

Sistema cria Subscription (Free)

↓

Sistema cria Pipeline padrão

↓

Sistema cria as etapas padrão

↓

Usuário é direcionado ao Dashboard

---

# Fluxo 02 - Login

Usuário informa:

- Email
- Senha

↓

Supabase Auth valida

↓

Sistema identifica Organization

↓

Carrega permissões

↓

Redireciona para Dashboard

---

# Fluxo 03 - Recuperação de Senha

Usuário informa Email

↓

Sistema envia Email

↓

Usuário redefine senha

↓

Retorna para Login

---

# Fluxo 04 - Cadastro de Cliente

Usuário acessa Clientes

↓

Novo Cliente

↓

Preenche informações

↓

Sistema salva

↓

Registra Activity

↓

Atualiza Dashboard

---

# Fluxo 05 - Movimentação do Funil

Usuário arrasta cliente

↓

Nova etapa

↓

Sistema atualiza Pipeline Stage

↓

Registra Activity

↓

Atualiza métricas

---

# Fluxo 06 - Criar Tarefa

Usuário abre Cliente

↓

Nova Tarefa

↓

Define:

- título
- prioridade
- vencimento

↓

Sistema salva

↓

Cria notificação

---

# Fluxo 07 - Concluir Tarefa

Usuário marca como concluída

↓

Sistema registra data

↓

Cria Activity

↓

Atualiza Dashboard

---

# Fluxo 08 - Atualizar Cliente

Usuário altera dados

↓

Sistema salva

↓

Atualiza updated_at

↓

Cria Activity

---

# Fluxo 09 - Alterar Plano

Usuário acessa Assinatura

↓

Escolhe plano

↓

Gateway confirma pagamento

↓

Subscription atualizada

↓

Novos recursos liberados

---

# Fluxo 10 - Logout

Usuário clica em Sair

↓

Sessão encerrada

↓

Retorna para Login

---

# Fluxo 11 - Exclusão de Cliente

Usuário solicita exclusão

↓

Sistema realiza Soft Delete

↓

Cliente deixa de aparecer

↓

Activity registrada

---

# Fluxo 12 - Convite de Usuários (Business)

Owner envia convite

↓

Usuário recebe Email

↓

Aceita convite

↓

Entra na Organization

↓

Permissões aplicadas

---

# Fluxo Geral

Landing Page

↓

Cadastro

↓

Login

↓

Dashboard

↓

Clientes

↓

Funil

↓

Tarefas

↓

Relatórios

↓

Configurações