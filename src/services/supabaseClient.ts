import { createClient, type SupabaseClient } from '@supabase/supabase-js';

type ViteEnvironment = {
  VITE_SUPABASE_URL?: string;
  VITE_SUPABASE_PUBLISHABLE_KEY?: string;
};

const environment = ((import.meta as ImportMeta & { env?: ViteEnvironment }).env || {});
const projectUrl = environment.VITE_SUPABASE_URL?.trim() || '';
const publishableKey = environment.VITE_SUPABASE_PUBLISHABLE_KEY?.trim() || '';

export const isCloudConfigured = Boolean(projectUrl && publishableKey);

/** The browser only receives a publishable key. Postgres RLS enforces ownership. */
export const supabase: SupabaseClient | null = isCloudConfigured
  ? createClient(projectUrl, publishableKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    })
  : null;
