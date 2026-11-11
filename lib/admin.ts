// Single source of truth for the admin identity.
// Must match the email baked into the RLS policies in
// supabase/migrations/0001_init_backend.sql — change both together.
export const ADMIN_EMAIL = 'parthu3915@gmail.com'

// The only name the admin login form accepts. The password is deliberately not in the
// code (this repo is public): it is stored hashed on the ADMIN_EMAIL user in Supabase Auth.
export const ADMIN_USERNAME = 'admin'
