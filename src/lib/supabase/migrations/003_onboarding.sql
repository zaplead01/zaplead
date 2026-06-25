-- ============================================================
-- 003_onboarding.sql
-- Onboarding automático do usuário
-- ZapLead CRM
-- ============================================================

-- ============================================================
-- Atualiza automaticamente o updated_at
-- ============================================================

create or replace function public.update_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

-- ============================================================
-- Trigger para user_profiles
-- ============================================================

drop trigger if exists trg_user_profiles_updated_at
on public.user_profiles;

create trigger trg_user_profiles_updated_at
before update
on public.user_profiles
for each row
execute function public.update_updated_at();

-- ============================================================
-- Trigger para organizations
-- ============================================================

drop trigger if exists trg_organizations_updated_at
on public.organizations;

create trigger trg_organizations_updated_at
before update
on public.organizations
for each row
execute function public.update_updated_at();

-- ============================================================
-- Trigger para subscriptions
-- ============================================================

drop trigger if exists trg_subscriptions_updated_at
on public.subscriptions;

create trigger trg_subscriptions_updated_at
before update
on public.subscriptions
for each row
execute function public.update_updated_at();

-- ============================================================
-- Trigger para customers
-- ============================================================

drop trigger if exists trg_customers_updated_at
on public.customers;

create trigger trg_customers_updated_at
before update
on public.customers
for each row
execute function public.update_updated_at();

-- ============================================================
-- Trigger para tasks
-- ============================================================

drop trigger if exists trg_tasks_updated_at
on public.tasks;

create trigger trg_tasks_updated_at
before update
on public.tasks
for each row
execute function public.update_updated_at();

-- ============================================================
-- Trigger para notifications
-- ============================================================

drop trigger if exists trg_notifications_updated_at
on public.notifications;

create trigger trg_notifications_updated_at
before update
on public.notifications
for each row
execute function public.update_updated_at();