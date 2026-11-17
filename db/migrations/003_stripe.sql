-- Links each profile to its Stripe customer and subscription. The plan
-- column is updated from Stripe webhooks for paid plans.
alter table profiles add column if not exists stripe_customer_id text unique;
alter table profiles add column if not exists stripe_subscription_id text;
alter table profiles add column if not exists subscription_status text;
