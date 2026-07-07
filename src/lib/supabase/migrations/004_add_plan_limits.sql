ALTER TABLE plans
ADD COLUMN IF NOT EXISTS max_pipelines integer NOT NULL DEFAULT 1,
ADD COLUMN IF NOT EXISTS max_tags integer NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS max_automations integer NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS max_webhooks integer NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS max_storage_mb integer NOT NULL DEFAULT 500;

-- PLANO FREE
UPDATE plans
SET
    max_customers = 100,
    max_users = 1,
    max_pipelines = 1,
    max_tags = 0,
    max_automations = 0,
    max_webhooks = 0,
    max_storage_mb = 500
WHERE slug = 'free';

-- PLANO PRO

UPDATE plans
SET
    max_customers = 999999,
    max_users = 999999,
    max_pipelines = 999999,
    max_tags = 999999,
    max_automations = 999999,
    max_webhooks = 999999,
    max_storage_mb = 100000
WHERE slug = 'pro';