import { createClient } from '@supabase/supabase-js'

// Only import in API routes — never in client components or server components
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
