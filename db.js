/**
 * NIKOlearn MVP - Direct Database Connection
 */

import { createClient } from '@supabase/supabase-js';

// Configuration using the new keys provided
const config = {
  url: "https://ntbdgaqpecsynmhmtobb.supabase.co",
  anonKey: "sb_publishable_tbueIop0A49myiEA_vJbTA_Y88Q1viV",
  serviceRoleKey: "sb_secret_SgK9c1Iyr8e_7XTPJplEoA_1D0mlcYz"
};

// Main Supabase client
export const supabase = createClient(config.url, config.anonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Admin client (using secret key)
export const supabaseAdmin = createClient(config.url, config.serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

export default supabase;