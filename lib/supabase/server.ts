import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { Database } from '@/types/database';

// Hardcoding keys since environment variables are not available in this context
const supabaseUrl = 'https://ntbdgaqpecsynmhmtobb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50YmRnYXFwZWNzeW5taG10b2JiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY0MDE2NDAsImV4cCI6MjA4MTk3NzY0MH0.0KDs4lPEYNQb2DzBrfIFnLiayOYq436QYZcZRmPDULg';

/**
 * Creates a Supabase client for use in Server Components.
 * This client correctly reads the session cookie from the request headers.
 */
export const createServerClient = () => {
  const cookieStore = cookies();

  return createClient<Database>(
    supabaseUrl,
    supabaseAnonKey,
    {
      auth: {
        // Manually handle cookies for session management in server components
        storage: {
          getItem: (key) => cookieStore.get(key)?.value,
          setItem: (key, value) => cookieStore.set(key, value),
          removeItem: (key) => cookieStore.delete(key),
        },
      },
    }
  );
};