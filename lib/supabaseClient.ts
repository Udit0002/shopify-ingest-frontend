// lib/supabaseClient.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!url || !anonKey) {
  console.warn('Missing NEXT_PUBLIC_SUPABASE_* env vars');
}

export const supabase: SupabaseClient = createClient(url, anonKey);
