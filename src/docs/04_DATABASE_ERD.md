# Database ERD - ZapLead

## Objetivo

Este documento define a estrutura oficial do banco de dados do ZapLead.

Toda implementação SQL deverá seguir exatamente este documento.

---

# Visão Geral

Organization
│
├── Organization Members
├── Subscription
│
├── Pipelines
│      └── Pipeline Stages
│
├── Customers
│      ├── Customer Notes
│      ├── Tasks
│      └── Activities
│
├── Notifications
│
├── Tags
│
└── Activity Logs

---

# organizations

Representa uma empresa.

Relacionamentos

1:N organization_members

1:1 subscriptions

1:N pipelines

1:N customers

1:N tags

1:N notifications

1:N activity_logs

---

Campos

id

name

slug

logo_url

is_active

created_at

updated_at

---

# organization_members

Representa um usuário pertencente a uma organização.

Relacionamentos

N:1 organizations

1:1 auth.users

1:N customers (responsável)

1:N tasks

---

Campos

id

organization_id

user_id

full_name

phone

avatar_url

role

is_active

created_at

updated_at

---

# subscriptions

Relacionamentos

1:1 organizations

Campos

id

organization_id

plan

status

trial_ends_at

current_period_start

current_period_end

gateway_customer_id

gateway_subscription_id

created_at

updated_at

---

# pipelines

Relacionamentos

N:1 organizations

1:N pipeline_stages

Campos

id

organization_id

name

description

is_default

is_active

created_at

updated_at

---

# pipeline_stages

Relacionamentos

N:1 pipelines

1:N customers

Campos

id

pipeline_id

name

color

position

created_at

updated_at

---

# customers

Relacionamentos

N:1 organizations

N:1 pipelines

N:1 pipeline_stages

N:1 organization_members

1:N customer_notes

1:N tasks

1:N activities

Campos

id

organization_id

pipeline_id

pipeline_stage_id

assigned_to

created_by

updated_by

name

company

email

phone

city

state

lead_source

status

deal_value

whatsapp_number_id

last_contact_at

won_at

lost_at

lost_reason

archived

tags (JSONB)

custom_fields (JSONB)

metadata (JSONB)

created_at

updated_at

deleted_at

---

# customer_notes

Relacionamentos

N:1 customers

N:1 organization_members

Campos

id

customer_id

member_id

content

created_at

updated_at

---

# tasks

Relacionamentos

N:1 customers

N:1 organization_members

Campos

id

customer_id

assigned_to

title

description

priority

status

due_date

completed_at

created_at

updated_at

---

# activities

Relacionamentos

N:1 customers

N:1 organization_members

Campos

id

customer_id

member_id

type

description

metadata

created_at

---

# tags

Relacionamentos

N:1 organizations

Campos

id

organization_id

name

color

created_at

---

# notifications

Relacionamentos

N:1 organizations

N:1 organization_members

Campos

id

organization_id

member_id

title

message

read

created_at

---

# activity_logs

Relacionamentos

N:1 organizations

N:1 organization_members

Campos

id

organization_id

member_id

action

entity

entity_id

ip_address

user_agent

created_at