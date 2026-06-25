-- ============================================================
-- ZapLead CRM
-- Initial Database Schema
-- Version: 1.0.0
-- ============================================================

BEGIN;

-- ============================================================
-- EXTENSIONS
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- ENUMS
-- ============================================================

CREATE TYPE role_enum AS ENUM (
    'owner',
    'admin',
    'member'
);

CREATE TYPE subscription_plan_enum AS ENUM (
    'free',
    'pro',
    'business'
);

CREATE TYPE subscription_status_enum AS ENUM (
    'active',
    'trialing',
    'past_due',
    'cancelled'
);

CREATE TYPE task_status_enum AS ENUM (
    'pending',
    'in_progress',
    'completed',
    'cancelled'
);

CREATE TYPE task_priority_enum AS ENUM (
    'low',
    'medium',
    'high',
    'urgent'
);

-- ============================================================
-- FUNCTIONS
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

-- ============================================================
-- ORGANIZATIONS
-- ============================================================

CREATE TABLE organizations (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name TEXT NOT NULL,

    slug TEXT UNIQUE NOT NULL,

    document TEXT,

    phone TEXT,

    email TEXT,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()

);

CREATE TRIGGER trg_organizations_updated_at
BEFORE UPDATE ON organizations
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- ORGANIZATION SETTINGS
-- ============================================================

CREATE TABLE organization_settings (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    organization_id UUID NOT NULL UNIQUE
        REFERENCES organizations(id)
        ON DELETE CASCADE,

    logo_url TEXT,

    primary_color TEXT DEFAULT '#16A34A',

    language TEXT NOT NULL DEFAULT 'pt-BR',

    timezone TEXT NOT NULL DEFAULT 'America/Sao_Paulo',

    currency TEXT NOT NULL DEFAULT 'BRL',

    date_format TEXT NOT NULL DEFAULT 'DD/MM/YYYY',

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()

);

CREATE TRIGGER trg_organization_settings_updated_at
BEFORE UPDATE ON organization_settings
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- USER PROFILES
-- ============================================================

CREATE TABLE user_profiles (

    id UUID PRIMARY KEY
        REFERENCES auth.users(id)
        ON DELETE CASCADE,

    full_name TEXT NOT NULL,

    avatar_url TEXT,

    phone TEXT,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()

);

CREATE TRIGGER trg_user_profiles_updated_at
BEFORE UPDATE ON user_profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- ORGANIZATION USERS
-- ============================================================

CREATE TABLE organization_users (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    organization_id UUID NOT NULL
        REFERENCES organizations(id)
        ON DELETE CASCADE,

    user_id UUID NOT NULL
        REFERENCES user_profiles(id)
        ON DELETE CASCADE,

    role role_enum NOT NULL DEFAULT 'member',

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT organization_user_unique
        UNIQUE (organization_id, user_id)

);

CREATE TRIGGER trg_organization_users_updated_at
BEFORE UPDATE ON organization_users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- SUBSCRIPTIONS
-- ============================================================

CREATE TABLE subscriptions (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    organization_id UUID NOT NULL
        REFERENCES organizations(id)
        ON DELETE CASCADE,

    plan subscription_plan_enum NOT NULL DEFAULT 'free',

    status subscription_status_enum NOT NULL DEFAULT 'active',

    provider TEXT,

    provider_subscription_id TEXT,

    starts_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    expires_at TIMESTAMPTZ,

    trial_ends_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()

);

CREATE TRIGGER trg_subscriptions_updated_at
BEFORE UPDATE ON subscriptions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- PIPELINES
-- ============================================================

CREATE TABLE pipelines (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    organization_id UUID NOT NULL
        REFERENCES organizations(id)
        ON DELETE CASCADE,

    name TEXT NOT NULL,

    description TEXT,

    is_default BOOLEAN NOT NULL DEFAULT FALSE,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()

);

CREATE TRIGGER trg_pipelines_updated_at
BEFORE UPDATE ON pipelines
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- PIPELINE STAGES
-- ============================================================

CREATE TABLE pipeline_stages (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    pipeline_id UUID NOT NULL
        REFERENCES pipelines(id)
        ON DELETE CASCADE,

    name TEXT NOT NULL,

    position INTEGER NOT NULL,

    color TEXT DEFAULT '#22C55E',

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT pipeline_stage_unique
        UNIQUE (pipeline_id, position)

);

CREATE TRIGGER trg_pipeline_stages_updated_at
BEFORE UPDATE ON pipeline_stages
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- CUSTOMERS
-- ============================================================

CREATE TABLE customers (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    organization_id UUID NOT NULL
        REFERENCES organizations(id)
        ON DELETE CASCADE,

    pipeline_id UUID NOT NULL
        REFERENCES pipelines(id)
        ON DELETE RESTRICT,

    pipeline_stage_id UUID NOT NULL
        REFERENCES pipeline_stages(id)
        ON DELETE RESTRICT,

    assigned_to UUID
        REFERENCES user_profiles(id)
        ON DELETE SET NULL,

    full_name TEXT NOT NULL,

    company TEXT,

    phone TEXT NOT NULL,

    email TEXT,

    lead_source TEXT,

    estimated_value NUMERIC(12,2),

    notes TEXT,

    last_contact_at TIMESTAMPTZ,

    next_follow_up_at TIMESTAMPTZ,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()

);

CREATE TRIGGER trg_customers_updated_at
BEFORE UPDATE ON customers
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_customers_organization
ON customers (organization_id);

CREATE INDEX idx_customers_pipeline
ON customers (pipeline_id);

CREATE INDEX idx_customers_stage
ON customers (pipeline_stage_id);

CREATE INDEX idx_customers_assigned
ON customers (assigned_to);

CREATE INDEX idx_customers_phone
ON customers (phone);

-- ============================================================
-- CUSTOMER NOTES
-- ============================================================

CREATE TABLE customer_notes (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    customer_id UUID NOT NULL
        REFERENCES customers(id)
        ON DELETE CASCADE,

    author_id UUID
        REFERENCES user_profiles(id)
        ON DELETE SET NULL,

    content TEXT NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()

);

CREATE TRIGGER trg_customer_notes_updated_at
BEFORE UPDATE ON customer_notes
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- CUSTOMER ACTIVITIES
-- ============================================================

CREATE TABLE customer_activities (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    customer_id UUID NOT NULL
        REFERENCES customers(id)
        ON DELETE CASCADE,

    user_id UUID
        REFERENCES user_profiles(id)
        ON DELETE SET NULL,

    activity_type TEXT NOT NULL,

    description TEXT NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()

);

CREATE INDEX idx_customer_activities_customer
ON customer_activities(customer_id);

-- ============================================================
-- TASKS
-- ============================================================

CREATE TABLE tasks (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    organization_id UUID NOT NULL
        REFERENCES organizations(id)
        ON DELETE CASCADE,

    customer_id UUID
        REFERENCES customers(id)
        ON DELETE CASCADE,

    assigned_to UUID
        REFERENCES user_profiles(id)
        ON DELETE SET NULL,

    title TEXT NOT NULL,

    description TEXT,

    due_date TIMESTAMPTZ,

    status task_status_enum NOT NULL DEFAULT 'pending',

    priority task_priority_enum NOT NULL DEFAULT 'medium',

    completed_at TIMESTAMPTZ,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()

);

CREATE TRIGGER trg_tasks_updated_at
BEFORE UPDATE ON tasks
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_tasks_customer
ON tasks(customer_id);

CREATE INDEX idx_tasks_assigned
ON tasks(assigned_to);

CREATE INDEX idx_tasks_organization
ON tasks(organization_id);

-- ============================================================
-- NOTIFICATIONS
-- ============================================================

CREATE TABLE notifications (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    organization_id UUID NOT NULL
        REFERENCES organizations(id)
        ON DELETE CASCADE,

    user_id UUID
        REFERENCES user_profiles(id)
        ON DELETE CASCADE,

    title TEXT NOT NULL,

    message TEXT NOT NULL,

    is_read BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()

);

CREATE INDEX idx_notifications_user
ON notifications(user_id);

-- ============================================================
-- ACTIVITY LOGS
-- ============================================================

CREATE TABLE activity_logs (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    organization_id UUID NOT NULL
        REFERENCES organizations(id)
        ON DELETE CASCADE,

    user_id UUID
        REFERENCES user_profiles(id)
        ON DELETE SET NULL,

    action TEXT NOT NULL,

    entity TEXT NOT NULL,

    entity_id UUID,

    metadata JSONB,

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()

);

CREATE INDEX idx_activity_logs_org
ON activity_logs(organization_id);

CREATE INDEX idx_activity_logs_user
ON activity_logs(user_id);

-- ============================================================
-- ADDITIONAL INDEXES
-- ============================================================

CREATE INDEX idx_pipeline_org
ON pipelines(organization_id);

CREATE INDEX idx_pipeline_stage_pipeline
ON pipeline_stages(pipeline_id);

CREATE INDEX idx_subscription_org
ON subscriptions(organization_id);

CREATE INDEX idx_org_users_org
ON organization_users(organization_id);

CREATE INDEX idx_org_users_user
ON organization_users(user_id);

-- ============================================================
-- HANDLE NEW USER
-- ============================================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN

    INSERT INTO user_profiles (
        id,
        full_name
    )
    VALUES (
        NEW.id,
        COALESCE(
            NEW.raw_user_meta_data->>'full_name',
            ''
        )
    );

    RETURN NEW;

END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION handle_new_user();

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;

ALTER TABLE organization_settings ENABLE ROW LEVEL SECURITY;

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

ALTER TABLE organization_users ENABLE ROW LEVEL SECURITY;

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

ALTER TABLE pipelines ENABLE ROW LEVEL SECURITY;

ALTER TABLE pipeline_stages ENABLE ROW LEVEL SECURITY;

ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

ALTER TABLE customer_notes ENABLE ROW LEVEL SECURITY;

ALTER TABLE customer_activities ENABLE ROW LEVEL SECURITY;

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION get_user_organization_id()
RETURNS UUID
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT organization_id
    FROM organization_users
    WHERE user_id = auth.uid()
      AND is_active = TRUE
    LIMIT 1;
$$;

CREATE POLICY "Users can view customers from their organization"
ON customers
FOR SELECT
USING (
    organization_id = get_user_organization_id()
);

CREATE POLICY "Users can insert customers"
ON customers
FOR INSERT
WITH CHECK (
    organization_id = get_user_organization_id()
);

    COMMIT;