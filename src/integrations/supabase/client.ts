import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://ntbdgaqpecsynmhmtobb.supabase.co";
// Using the new development publishable key provided
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_tbueIop0A49myiEA_vJbTA_Y88Q1viV";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);