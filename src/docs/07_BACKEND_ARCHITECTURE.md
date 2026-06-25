# Arquitetura do Backend

## Objetivo

Definir a arquitetura oficial do backend do ZapLead.

Toda nova funcionalidade deverá seguir esta estrutura.

---

# Tecnologias

Framework

* Next.js 15 (App Router)

Linguagem

* TypeScript

Banco de Dados

* PostgreSQL (Supabase)

Autenticação

* Supabase Auth

Storage

* Supabase Storage

Deploy

* Vercel

---

# Arquitetura

A aplicação é dividida em camadas.

```
UI

↓

Services

↓

Repositories

↓

Supabase

↓

PostgreSQL
```

Cada camada possui uma responsabilidade específica.

---

# Estrutura de Pastas

```
app/

components/

hooks/

lib/

repositories/

services/

types/

utils/

supabase/

docs/
```

---

# Responsabilidades

## app/

Rotas da aplicação.

Não contém regra de negócio.

---

## components/

Componentes reutilizáveis.

Não acessam diretamente o banco.

---

## hooks/

Custom Hooks.

Responsáveis pelo estado e consumo dos Services.

---

## services/

Contêm todas as regras de negócio.

Exemplos:

* criar cliente
* concluir tarefa
* mover cliente
* validar plano

---

## repositories/

Responsáveis exclusivamente pelo acesso ao banco.

Nunca possuem regra de negócio.

---

## lib/

Configurações compartilhadas.

Exemplos:

* cliente Supabase
* autenticação
* validações

---

## types/

Tipos TypeScript.

Incluindo os tipos gerados automaticamente do Supabase.

---

## utils/

Funções auxiliares reutilizáveis.

---

# Fluxo de Dados

```
Página

↓

Componente

↓

Hook

↓

Service

↓

Repository

↓

Supabase

↓

Banco
```

---

# Regras

Nunca acessar o Supabase diretamente dentro de componentes React.

Toda lógica deve passar por Services.

Repositories apenas executam consultas.

---

# Tratamento de Erros

Services são responsáveis por:

* validar entrada
* tratar exceções
* retornar mensagens amigáveis

Repositories apenas propagam erros do banco.

---

# Convenções

Services

customer.service.ts

task.service.ts

dashboard.service.ts

Repositories

customer.repository.ts

task.repository.ts

pipeline.repository.ts

---

# Objetivo

Manter um backend organizado, desacoplado e preparado para crescimento.
