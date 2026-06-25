# Regras de Negócio

## Objetivo

Este documento define as regras de funcionamento do ZapLead.

Todas as funcionalidades devem respeitar estas regras.

---

# Organização

Uma organização representa uma empresa.

Cada organização possui seus próprios dados.

Nenhum usuário pode acessar dados de outra organização.

---

# Cadastro

Quando um usuário cria uma conta:

1. Uma organização é criada.
2. O usuário torna-se o proprietário da organização.
3. Um plano Free é criado automaticamente.
4. Um pipeline padrão é criado.
5. As etapas padrão são criadas.
6. O Dashboard é inicializado.

---

# Organização

Cada organização pode possuir:

- vários usuários
- vários clientes
- vários pipelines
- várias tarefas
- várias tags

---

# Usuários

Cada usuário pertence a uma organização.

Papéis disponíveis:

- Owner
- Admin
- Member

Permissões:

Owner

- acesso total

Admin

- gerenciamento operacional

Member

- acesso conforme permissões futuras

---

# Clientes

Cada cliente pertence a apenas uma organização.

Cada cliente deve possuir:

- nome
- telefone
- pipeline
- etapa

Campos opcionais:

- email
- empresa
- cidade
- estado
- observações
- valor da negociação

---

# Pipeline

Cada organização pode criar vários pipelines.

Cada pipeline deve possuir pelo menos uma etapa.

---

# Etapas

Todo cliente deve estar em uma etapa.

Ao mover um cliente:

- atualizar etapa
- registrar atividade
- atualizar data de modificação

---

# Tarefas

Toda tarefa pertence a um cliente.

Toda tarefa possui:

- responsável
- prioridade
- status
- vencimento

Ao concluir:

- registrar data
- registrar atividade

---

# Atividades

Toda alteração importante gera uma atividade.

Exemplos:

- cliente criado
- cliente alterado
- mudança de etapa
- tarefa criada
- tarefa concluída

---

# Assinaturas

Plano Free

- até 50 clientes
- 1 usuário
- funcionalidades básicas

Plano Pro

- clientes ilimitados
- relatórios
- tarefas
- histórico completo

Plano Business

- múltiplos usuários
- dashboards avançados
- integrações
- futuras automações

---

# Exclusão

Nenhum dado importante será removido fisicamente.

Utilizar Soft Delete sempre que possível.

---

# Segurança

Toda consulta deve utilizar Row Level Security.

Todos os filtros devem considerar organization_id.

Nenhuma informação pode ser compartilhada entre organizações.

---

# Auditoria

Ações importantes devem ser registradas em Activity Logs.

Exemplos:

- login
- exclusão
- alteração de plano
- alteração de permissões

---

# Objetivo

Garantir que o comportamento do sistema seja previsível, seguro e consistente.